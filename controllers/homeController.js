// 요청된 라우트를 나타내는 ejs 페이지를 사용해 응답

// 이것도 나중엔  디비에서 가져와야겠지
var courses =[
    {
        title:"Event Driven Cakes",
        cost: 50
    },
    {
        title:"Aynchronous Artichoke",
        cost: 25
    },
    {
        title: "Object Oriented Orange Juice",
        cost: 10
    }
];

exports.showCourses = (req, res)=>{
    //res.render("courses");
    res.render("courses",{
        offeredCourses: courses
    });
};

exports.showSignUp = (req, res)=>{
    res.render("contact");
}

exports.postedContactForm = (req, res)=>{
    res.render("thanks");
};