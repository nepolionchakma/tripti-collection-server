const { default: axios } = require("axios");
const prisma = require("../DB/db.config");
const jwt = require("jsonwebtoken");
// Step 1: Google Login URL
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const GOOGLE_REDIRECT_URI = process.env.GOOGLE_REDIRECT_URI;

const REDIRECT_APP_URL = process.env.REDIRECT_APP_URL;
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
const EXPIRED = process.env.EXPIRED;
console.log(
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  GOOGLE_REDIRECT_URI,
  REDIRECT_APP_URL,
  JWT_SECRET_KEY,
  EXPIRED,
  "GOOGLE_CLIENT_ID,GOOGLE_CLIENT_SECRET,GOOGLE_REDIRECT_URI,REDIRECT_APP_URL,JWT_SECRET_KEY,EXPIRED"
);
exports.googleLogin = (req, res) => {
  const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${GOOGLE_CLIENT_ID}&redirect_uri=${GOOGLE_REDIRECT_URI}&response_type=code&scope=email%20profile`;
  res.redirect(googleAuthUrl);
};

// Step 2: Handle Google Callback
exports.googleCallback = async (req, res) => {
  const code = req.query.code;
  const returnUrl = req.cookies.returnUrl || REDIRECT_APP_URL;
  console.log(code, returnUrl, "code & returnUrl");
  try {
    const { data } = await axios.post(
      "https://oauth2.googleapis.com/token",
      {
        code,
        client_id: GOOGLE_CLIENT_ID,
        client_secret: GOOGLE_CLIENT_SECRET,
        redirect_uri: GOOGLE_REDIRECT_URI,
        grant_type: "authorization_code",
      },
      { headers: { "Content-Type": "application/json" } }
    );
    console.log("Google Token Response:", data);
    const { access_token } = data;
    const profile = await axios.get(
      "https://www.googleapis.com/oauth2/v2/userinfo",
      { headers: { Authorization: `Bearer ${access_token}` } }
    );
    console.log("Google Profile Response:", profile.data);
    const userEmail = profile.data.email;
    // Check if user exists, else create
    let user = await prisma.users.findFirst({
      where: {
        email: userEmail,
      },
    });
    console.log(user, "user");
    const authToken = (user) => {
      return jwt.sign(
        {
          user,
        },
        JWT_SECRET_KEY,
        { expiresIn: EXPIRED }
      );
    };

    if (!user) {
      // const maxUserIDResult = await prisma.users.aggregate({
      //   _max: {
      //     id: true,
      //   },
      // });

      const baseUserName = profile.data.name.split(" ").join("").toLowerCase();

      let userName = baseUserName;

      // Check if the username exists
      const existingUser = await prisma.users.findFirst({
        where: { user_name: userName },
      });

      if (existingUser) {
        userName = `${baseUserName}${1}`;
      }

      const currentTime = new Date();
      const profile_type = ["user"];
      // const maxID = maxUserIDResult._max.id + 1;
      const dataUser = {
        user_name: userName,
        first_name: profile.data.given_name,
        last_name: profile.data.family_name,
        email: profile.data.email,
        picture: profile.data.picture,
        profile_type,
        created_at: currentTime,
      };

      user = await prisma.users.create({
        data: {
          ...dataUser,
          access_token: authToken(dataUser),
        },
      });
      return res
        .status(200)
        .cookie("access_token", authToken(user), {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          secure: false,
        })
        .redirect(`${returnUrl}`);
    } else {
      const exitingUser = await prisma.users.findFirst({
        where: { email: userEmail },
      });
      delete exitingUser.access_token;
      const response = await prisma.users.update({
        where: {
          id: exitingUser.id,
        },
        data: {
          access_token: authToken(exitingUser),
        },
      });

      return res
        .status(200)
        .cookie("access_token", authToken(response), {
          httpOnly: true,
          // secure: process.env.NODE_ENV === "production",
          // sameSite: "None",
          secure: true,
        })
        .redirect(`${returnUrl}`);
    }
  } catch (error) {
    console.error(error);
    if (!res.headersSent) {
      res
        .status(500)
        .json({ error: "Field to create user via Google account." })
        .redirect(`${REDIRECT_APP_URL}/login`);
    }
  }
};
exports.me = async (req, res) => {
  const access_token = req.cookies.access_token;

  if (!access_token) {
    return res.json({ error: "Unauthorized" });
    // return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(access_token, JWT_SECRET_KEY);
    res.status(200).json(decoded);
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};
exports.logout = async (req, res) => {
  try {
    return res
      .status(200)
      .clearCookie("access_token")
      .json({ message: "Logged out successfully" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
