import "./style/Home.css";
import course1 from "../assets/Images/course1.jpg";
import course2 from "../assets/Images/course2.jpg";
import course3 from "../assets/Images/course3.jpg";
import course4 from "../assets/Images/course4.jpg";
import news1 from "../assets/Images/Website Developming.jpeg";
import news2 from "../assets/Images/popular4.jpg";
import news3 from "../assets/Images/Finger Warm-Up Exercises to Extended Flexibility and Prevent Overuse Injury.jpeg";
import news4 from "../assets/Images/Launching A Job Search The Right Way.jpeg";
import event1 from "../assets/Images/blog4.jpeg";
import event2 from "../assets/Images/blog3.jpeg";
import event3 from "../assets/Images/Back to School Bash.jpeg";

export default function Home() {
    return (
        <div className="home">
            <header className="header">
                <div className="h-100 d-flex justify-content-center align-items-center">
                    <div className="page-title text-white">
                        Welcome To ABS center
                    </div>
                </div>
            </header>

            <div className="container mt-5 pt-5">
                <div className="row text-center">
                    <div className="col-4">
                        <h3>Best Industry Leaders</h3>
                        <p>Description about best industry leaders.</p>
                    </div>
                    <div className="col-4">
                        <h3>National Awards</h3>
                        <p>Description about national awards.</p>
                    </div>
                    <div className="col-4">
                        <h3>Best Teachers</h3>
                        <p>Description about best teachers.</p>
                    </div>
                </div>
            </div>
            <br />
            <div className="container-fluid mt-5 py-5 courses">
                <div className="text-center">
                    <h2 className="my-5 page-title">Our Courses</h2>
                    <div className="row">
                        <div className="col-3">
                            <div className="home-img-container">
                                <img
                                    className="img-fluid w-100 shadow"
                                    src={course1}
                                    alt="Materials Technology"
                                />
                            </div>
                            <h3 className="mt-4">How To Create A Website</h3>
                            <p>Mr. Lucius</p>
                            <p>
                                Learn the basics of web development with this
                                comprehensive course.
                            </p>
                        </div>
                        <div className="col-3">
                            <div className="home-img-container w-100">
                                <img
                                    className="img-fluid w-100"
                                    src={course2}
                                    alt="Materials Technology"
                                />
                            </div>
                            <h3 className="mt-4">Photoshop Tutorial</h3>
                            <p>Mr. Tim Brodus</p>
                            <p>
                                Master Photoshop with this step-by-step guide.
                            </p>
                        </div>
                        <div className="col-3">
                            <div className="home-img-container w-100">
                                <img
                                    className="img-fluid w-100"
                                    src={course3}
                                    alt="Materials Technology"
                                />
                            </div>
                            <h3 className="mt-4">Design</h3>
                            <p>Mr. John Wick</p>
                            <p>
                                Become an expert Design teacher with our
                                in-depth course.
                            </p>
                        </div>
                        <div className="col-3">
                            <div className="home-img-container w-100">
                                <img
                                    className="img-fluid w-100"
                                    src={course4}
                                    alt="Materials Technology"
                                />
                            </div>
                            <h3 className="mt-4">Learning English</h3>
                            <p>Ms. Lara Croft</p>
                            <p>
                                Get fluent in English with our interactive
                                lessons.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container-fluid news">
                <div className="text-center my-4">
                    <h2 className="page-title">Latest News</h2>
                    <div className="row">
                        <div className="col-3">
                            <div className="home-img-container my-5">
                                <img
                                    className="img-fluid w-100"
                                    src={news1}
                                    alt="The Future Of Web Design"
                                />
                            </div>
                            <h3>The Future Of Web Design</h3>
                            <p>
                                The future of web design is poised to be highly
                                dynamic, driven by advancements in technology
                                and changing user expectations. Artificial
                                intelligence and machine learning will play a
                                crucial role in creating more personalized.
                            </p>
                        </div>
                        <div className="col-3">
                            <div className="home-img-container my-5">
                                <img
                                    className="img-fluid w-100"
                                    src={news2}
                                    alt="The Future Of Web Design"
                                />
                            </div>
                            <h3>How to get better at Learning</h3>
                            <p>
                                Learning techniques are strategies used to
                                acquire, retain, and apply knowledge
                                effectively. Key techniques include active
                                learning, which involves engaging with the
                                material through discussion, practice, and
                                teaching others.
                            </p>
                        </div>
                        <div className="col-3">
                            <div className="home-img-container my-5">
                                <img
                                    className="img-fluid w-100"
                                    src={news3}
                                    alt="The Future Of Web Design"
                                />
                            </div>
                            <h3>Tips for being better Musician</h3>
                            <p>
                                Becoming a better musician requires regular,
                                focused practice, and a deep understanding of
                                music Consistently exposing yourself to various
                                genres and collaborating with other musicians
                                can broaden your musical perspective .
                            </p>
                        </div>
                        <div className="col-3">
                            <div className="home-img-container my-5">
                                <img
                                    className="img-fluid w-100"
                                    src={news4}
                                    alt="The Future Of Web Design"
                                />
                            </div>
                            <h3>Prepare for Jobs' Opportunity</h3>
                            <p>
                                ob preparation involves a series of strategic
                                steps to enhance your employability and
                                readiness for the job market. It includes
                                crafting a tailored resume and cover letter that
                                highlight relevant skills and experiences.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container-fluid events">
                <div className="text-center">
                    <h2 className="page-title">Recent Event</h2>
                    <div className="row">
                        <div className="col-4">
                            <div className="home-img-container">
                                <img
                                    className="w-75"
                                    src={event1}
                                    alt="Summer School 2017"
                                />
                            </div>
                            <h3 className="mt-4">Summer School 2017</h3>
                            <p className="w-75 mx-auto">
                                Summer School 2017 is an immersive educational
                                program designed to provide students with
                                enriching academic experiences during the summer
                                break. The program offers a diverse range of
                                courses across various disciplines, including
                                science, arts, technology, and humanities,
                                catering to different age groups and learning
                                levels.
                            </p>
                        </div>
                        <div className="col-4">
                            <div className="home-img-container">
                                <img
                                    className="w-75"
                                    src={event2}
                                    alt="Summer School 2017"
                                />
                            </div>
                            <h3 className="mt-4">Hands On Training Workshop</h3>
                            <p className="w-75 mx-auto">
                                he Hands-On Training Workshop is an interactive
                                learning experience designed to provide
                                participants with practical skills and
                                real-world applications. This workshop
                                emphasizes active participation, allowing
                                attendees to engage directly with tools,
                                techniques, and equipment relevant to their
                                field.
                            </p>
                        </div>
                        <div className="col-4">
                            <div className="home-img-container">
                                <img
                                    className="w-75"
                                    src={event3}
                                    alt="Summer School 2017"
                                />
                            </div>
                            <h3 className="mt-4">Colorful Day Event</h3>
                            <p className="w-75 mx-auto">
                                The Colorful Day Event is a vibrant celebration
                                filled with activities and entertainment for all
                                ages. This lively event features an array of
                                colorful decorations, live music, and dance
                                performances that create an energetic
                                atmosphere.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container-fluid rev">
                <div className="text-center">
                    <h2 className="page-title">What's the Students saying?</h2>
                    <div className="row justify-content-evenly testimonies">
                        <div className="col-4">
                            <p>
                                "In today's world, it's important to harness
                                technology to help us advance and connect."
                            </p>
                            <h3>Russell Stephens</h3>
                        </div>
                        <div className="col-4">
                            <p>
                                "Together as teachers, students and universities
                                we can help make this education available for
                                everyone."
                            </p>
                            <h3>Kiswi Leonard</h3>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
