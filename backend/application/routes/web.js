const middle = require('../middleware/index');
const SchemaValidator = require('../middleware/schema_validator');
const validateRequest = SchemaValidator(true);

const _auth = require("../controller/auth");
const _users = require("../controller/users");
module.exports.init = ( app ) => {
    app.all('/admin/*', middle.authenticate );

    app.post("/login", validateRequest, _auth.adminLogin);

    app.post("/admin/users-list", _users.findAll);
    app.delete("/users/:id", _users.delete);
    app.get("/users/:id", _users.findOne);
    app.put("/users/:id", _users.update);

    app.put("/update-admin", _users.updateAdmin);
}