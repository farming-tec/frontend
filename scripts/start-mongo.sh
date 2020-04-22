#!/bin/sh
# REBUILD if you make a change

mongo -- "$MONGO_DATABASE_NAME" << EOF
    var rootUser = '$MONGO_ROOT_USERNAME';
    var rootPassword = '$MONGO_ROOT_PASSWORD';
    var admin = db.getSiblingDB('admin');
    admin.auth(rootUser, rootPassword);

    var user = '$MONGO_CROP_USERNAME';
    var passwd = '$MONGO_CROP_PASSWORD';
    db.createUser({ user: user, pwd: passwd, roles: ["readWrite"]});
EOF