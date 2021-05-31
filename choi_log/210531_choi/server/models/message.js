const mongoose = require("mongoose");



const MessageSchema = mongoose.Schema({
    date: {
        type: Date,
        required: true,
    },
    content: {
        type: String,
        required: true,
        minLength: 1,
    },
    oid: {
        type: String,
        required: true
    },
    midx: {
        type: Number,
        require: true
    }
});

MessageSchema.statics.latest = ({oid, midx}) => {
    return MessageModel.find({$or: [{oid: oid, midx: midx},{oid: midx, midx: oid}]}).sort({"date": "asc"});
}

MessageSchema.statics.create = ({content, oid, midx}) => {
    let msg = new MessageModel({
        date: new Date(),
        content: content,
        oid: oid,
        midx: midx
    });

    return msg.save();
}


const MessageModel = mongoose.model("Message", MessageSchema);



module.exports = {
    Schema: MessageSchema,
    Model: MessageModel
}