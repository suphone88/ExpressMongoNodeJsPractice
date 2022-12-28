const router = require("express").Router();
const controller = require("../controllers/post");
const {
  validateToken,
  validateBody,
  validateParam,
} = require("../utils/validator");
const { PostSchema, AllSchema } = require("../utils/schema");
const { saveFile } = require("../utils/gallery");

router.get("/", controller.all);

router.post(
  "/",
  validateToken,
  saveFile,
  validateBody(PostSchema),
  controller.post
);
router.get("/bycat/:id", controller.byCatId);
router.get("/byuser/:id", controller.byUserId);

router.get("/paginate/:page", [
  validateParam(AllSchema.page, "page"),
  controller.paginate,
]);

router
  .route("/:id")
  .get(controller.get)
  .patch(validateToken, controller.patch)
  .delete(validateToken, controller.drop);

module.exports = router;
