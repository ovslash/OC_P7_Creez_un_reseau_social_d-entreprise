//----------------------- fichier présentant les routes comments disponibles -----------------------//

const express = require("express");
const router = express.Router();
const commentsCtrl = require("../controllers/comments");
const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");

router.post("/:postId/comment", auth, multer, commentsCtrl.createComment);
router.put(
  "/:postId/comment/:commentId",
  auth,
  multer,
  commentsCtrl.modifyComment
);
router.delete("/:postId/comment/:commentId", auth, commentsCtrl.deleteComment);
router.get("/:postId/comments", auth, commentsCtrl.getAllCommentsOfPost);
router.get(
  "/:postId/comment/:commentId",
  auth,
  commentsCtrl.getOneCommentOfPost
);

module.exports = router;
