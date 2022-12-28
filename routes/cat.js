const router = require("express").Router();
const controller = require("../controllers/cat");
const { saveFile } = require("../utils/gallery");
const { CatSchema, AllSchema } = require("../utils/schema");
const {
  validateBody,
  validateParam,
  validateToken,
} = require("../utils/validator");

router.get("/", controller.all);
router.post("/", [
  validateToken,
  saveFile,
  validateBody(CatSchema),
  controller.add,
]);

router
  .route("/:id")
  .get(validateParam(AllSchema.id, "id"), controller.get)
  // .patch(
  //   saveFile,
  //   validateToken,
  //   validateBody(AllSchema.image),
  //   controller.patch
  // )
  .patch(validateToken, validateParam(AllSchema.id, "id"), controller.patch)
  .delete(validateToken, validateParam(AllSchema.id, "id"), controller.drop);

module.exports = router;
