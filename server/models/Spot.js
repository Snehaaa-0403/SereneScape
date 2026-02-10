import mongoose from "mongoose";

const spotSchema=new mongoose.Schema({
    name:{ type: String, required: true , unique:true},
    location:{ type: String, required: true },
    description:{ type: String, required: true },
    avgDailyCost:{ type: Number, required: true },
    serenityScore:{ type: Number, min: 1, max: 10 },
    tags:[{ type: String }],
    imageUrl:{ type: String }
},{timestamps:true});

const Spot=mongoose.model('Spot',spotSchema);

export default Spot;