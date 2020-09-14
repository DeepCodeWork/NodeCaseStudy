const express = require("express");
const mongoose = require("mongoose");

const router = express.Router();
const CourseModel = require("../model/course.model");
router.get("/add", (req,res)=>{
    res.render("add-course")
});
router.post("/add", (req,res)=>{
    res.render("add-course");
    var course = new CourseModel();
    course.courseName = req.body.courseName;
    course.courseDuration = req.body.courseDuration;
    course.courseFee = req.body.courseFee;
    course.courseId = Math.ceil(Math.random()*10000000)+"";
    course.save((err,doc)=>{
        if(!err){
            res.redirect("/course/list")
        }
        else{
            res.send("Error occured");
        }
    });
})


router.get("/list",(req,res)=>{
    CourseModel.find((err,docs)=>{
        if(!err)
        {
            const courses = {
                userDocuments: docs.map(document =>{
                    return {
                        courseId: document.courseId,
                        courseName: document.courseName
                    }
                })
            }
            console.log(courses);
            res.render("list", {userDocuments: courses.userDocuments})
        }
    })
    
});
module.exports = router;