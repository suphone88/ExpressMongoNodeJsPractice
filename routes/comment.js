const router = require("express").Router();
const controller = require("../controllers/comment");

const {
  validateParam,
  validateBody,
  validateToken,
} = require("../utils/validator");
const { AllSchema, CommentSchema } = require("../utils/schema");

router.post("/", [validateBody(CommentSchema), controller.add]);
//router.get("/", controller.all);
router.get("/:id", [validateParam(AllSchema.id, "id"), controller.all]);
router.delete(
  "/:id",
  validateParam(AllSchema.id, "id"),
  validateToken,
  controller.drop
);

module.exports = router;
