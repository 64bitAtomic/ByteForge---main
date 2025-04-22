var bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");
const projectModel = require("../models/projectModel");
const { getStartupCode } = require("../util/utility");
const axios = require('axios');
const secret = "secret";
MAILBOXLAYER_API_KEY = "fe2199672bede52fc9f8d8560f4d7ff2"

const verifyEmail = async (email) => {
  const access_key = MAILBOXLAYER_API_KEY;
  const url = `http://apilayer.net/api/check?access_key=${access_key}&email=${email}`;
  const res = await axios.get(url);
  return res.data;
};

exports.signUp = async (req, res) => {
  try {
    let { email, pwd, fullName } = req.body;
    const result = await verifyEmail(email);
    
if (!result.format_valid || !result.smtp_check) {
  return res.status(400).json({
    success: false,
    msg: "Email is not valid or deliverable",
  });
}
    let emailCon = await userModel.findOne({ email: email });
    if (emailCon) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }
    bcrypt.genSalt(12, function (err, salt) {
      bcrypt.hash(pwd, salt, async function (err, hash) {
        let user = await userModel.create({
          email: email,
          password: hash,
          fullName: fullName,
        });
        return res
          .status(200)
          .json({ success: true, msg: "user created successfully" });
      });
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    let { email, pwd } = req.body;
    let user = await userModel.findOne({ email: email });
    if (!user) {
      return res.status(404).json({
        success: false,
        msg: "User Not Found",
      });
    }

    bcrypt.compare(pwd, user.password, function (err, result) {
      if (result) {
        let token = jwt.sign({ userId: user._id }, secret);
        return res.status(200).json({
          success: true,
          msg: "User logged in successfully!",
          token,
        });
      } else {
        return res.status(401).json({
          success: false,
          msg: "Invalid password.",
        });
      }
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.createProj = async (req, res) => {
  try {
    let { name, projLanguage, token, version } = req.body;
    let decoded = jwt.verify(token, secret);
    let user = await userModel.findOne({ _id: decoded.userId });
    if (!user) {
      return res.status(404).json({
        success: false,
        msg: "User not found",
      });
    }

    let project = await projectModel.create({
      name: name,
      projLanguage: projLanguage,
      createdBy: user._id,
      code: getStartupCode(projLanguage),
      version: version,
    });
    return res.status(200).json({
      success: true,
      msg: "Project created successfully",
      project: project._id,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      msg: error.message,
    });
  }
};

exports.saveProject = async (req, res) => {
  try {
    let { token, projectId, code } = req.body;
    let decoded = jwt.verify(token, secret);
    let user = await userModel.findOne({ _id: decoded.userId });
    if (!user) {
      return res.status(404).json({
        success: false,
        msg: "Usee Not Found.",
      });
    }
    let project = await projectModel.findOne({ _id: projectId });
    project.code = code;
    await project.save();
    return res.status(200).json({
      success: true,
      msg: "Project Created Successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      msg: error.message,
    });
  }
};

exports.getProjects = async (req, res) => {
  try {
    let { token } = req.body;
    let decoded = jwt.verify(token, secret);
    let user = await userModel.findOne({ _id: decoded.userId });
    if (!user) {
      return res.status(404).json({
        success: false,
        msg: "user not found",
      });
    }
    let projects = await projectModel.find({ createdBy: user._id });
    return res.status(200).json({
      success: true,
      msg: "Project Fetched Successfully.",
      projects: projects,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      msg: error.message,
    });
  }
};



exports.getUserName = async (req,res)=>{
  const {token} = req.body;
  const decode = jwt.verify(token,secret);
  const {fullName} = await userModel.findById({_id : decode.userId})
  console.log(fullName);
  if(fullName) {
    return res.status(200).json({
      success: true,
      msg: "UserName Fetched Successfully.",
      username: fullName
    })
  }else{
    return res.status(404).json({
      success: false,
      msg: error.message
    })
  }
 
}

// exports.getProject = async (req, res) => {
//   try {
//     let { token, projectId } = req.body;
//     let decoded = jwt.verify(token, secret);
//     let user = await userModel.findOne({ _id: decoded.userId });
//     if (!user) {
//       return res.status(404).json({
//         success: false,
//         msg: "user not found",
//       });
//     }
//     let project = await projectModel.findOne({ _id: projectId });
//     if (project) {
//       return res.status(200).json({
//         success: true,
//         msg: "Project Found successfully.",
//         project: project,
//       });
//     } else {
//       return res.status(404).json({
//         success: false,
//         msg: "Project Not Found.",
//       });
//     }
//   } catch (error) {
//     return res.status(500).json({
//       success: false,
//       msg: error.message,
//     });
//   }
// };

exports.getProject = async (req, res) => {
  try {
    let { token, projectId } = req.body;
    let decoded = jwt.verify(token, secret);
    let user = await userModel.findOne({ _id: decoded.userId });

    if (!user) {
      return res.status(404).json({
        success: false,
        msg: "User not found",
      });
    }

    let project = await projectModel.findOne({ _id: projectId });

    if (project) {
      return res.status(200).json({
        success: true,
        msg: "Project fetched successfully",
        project: project,
      });
    } else {
      return res.status(404).json({
        success: false,
        msg: "Project not found",
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      msg: error.message,
    });
  }
};

exports.deleteProject = async (req, res) => {
  try {
    let { token, projectId } = req.body;
    let decoded = jwt.verify(token, secret);
    let user = await userModel.findById({ _id: decoded.userId });
    if (!user) {
      return res.status(404).json({
        success: false,
        msg: "User Not Found",
      });
    }
    let project = await projectModel.findOneAndDelete({ _id: projectId });

    return res.status(200).json({
      success: true,
      msg: "Project Deleted Successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      msg: error.message,
    });
  }
};

exports.editProject = async (req, res) => {
  try {
    let { token, projectId, name } = req.body;
    let decoded = jwt.verify(token, secret);
    let user = await userModel.findOne({ _id: decoded.userId });

    if (!user) {
      return res.status(404).json({
        success: false,
        msg: "User not found",
      });
    }

    let project = await projectModel.findOne({ _id: projectId });
    if (project) {
      project.name = name;
      await project.save();
      return res.status(200).json({
        success: true,
        msg: "Project edited successfully",
      });
    } else {
      return res.status(404).json({
        success: false,
        msg: "Project not found",
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      msg: error.message,
    });
  }
};
