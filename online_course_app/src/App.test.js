import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

// {
// 	"CoursesList": [
// 		{
// 			 "title": "JavaScript Tutorial",
// 			 "isEnrolled": "true",
//           "HeaderTitle":"Development",
//            "Description":"Welcome to the brand new course where you can learn about how to build a personal portfolio website from scratch with only JS. If you want to create your own portfolio which will help you to represent yourself in the best way and get hired then this is the right course for you. If you ask any of the employers or project managers how to choose the best developers everyone will answer that the most important thing about the developer is to represent himself or herself with a good portfolio."
          
// 		},
// 		{
// 			 "title": "Agile Methodologies",
// 			 "isEnrolled": "true",
//           "HeaderTitle":"IT and Software",
//            "Description":"The Agile methodology is a way to manage a project by breaking it up into several phases. It involves constant collaboration with stakeholders and continuous improvement at every stage. Once the work begins, teams cycle through a process of planning, executing, and evaluating."
          
// 		},
// 		{
// 			 "title": "Digital Marketing",
// 			 "isEnrolled": "true",
//           "HeaderTitle":"Marketing",
//            "Description":"With over 20 hours of training, quizzes and practical steps you can follow - this is one of the most comprehensive digital marketing courses available. We cover SEO, YouTube Marketing, Facebook Marketing, Google Adwords, Google Analytics and more! Learn By Doing The course is hugely interactive with projects, checklists & actionable lectures built into every section. Learn step by step how to market a business online from scratch across all the major marketing channels. Follow the steps on screen to get results at work, for own business or for your digital marketing clients.",
          
// 		},
//       {
// 			 "title": "HTML and CSS for beginners",
// 			 "isEnrolled": "true",
//           "HeaderTitle":"Design",
//            "Description":"Welcome to the brand new course where you can learn about how to build a personal portfolio website from scratch with only three core technologies HTML, CSS, and JS. If you want to create your own portfolio which will help you to represent yourself in the best way and get hired then this is the right course for you. If you ask any of the employers or project managers how to choose the best developers everyone will answer that the most important thing about the developer is to represent himself or herself with a good portfolio."
          
// 		}
// 	]
// }

// "CoursesList": [{
    
//   "isEnrolled": "true",
//   "HeaderTitle":"Development",
//   "title": "JavaScript Tutorial",
//   "Description":
//     "Welcome to the brand new course where you can learn about how to build a personal portfolio website from scratch with only three core technologies HTML, CSS, and JS. If you want to create your own portfolio which will help you to represent yourself in the best way and get hired then this is the right course for you. If you ask any of the employers or project managers how to choose the best developers everyone will answer that the most important thing about the developer is to represent himself or herself with a good portfolio.",
// },
//                {
//   "isEnrolled": "true",
//                      "HeaderTitle":"IT and Software",

//   "title": "Agile Methodologies",
//   "Description":
//     "The Agile methodology is a way to manage a project by breaking it up into several phases. It involves constant collaboration with stakeholders and continuous improvement at every stage. Once the work begins, teams cycle through a process of planning, executing, and evaluating.",
// },
  
//   "isEnrolled": "true",
//                    "HeaderTitle":"Design",

//   "title": "HTML and CSS for beginners",
//                    "HeaderTitle":"Marketing"

//   "Description":
//     "Welcome to the brand new course where you can learn about how to build a personal portfolio website from scratch with only three core technologies HTML, CSS, and JS. If you want to create your own portfolio which will help you to represent yourself in the best way and get hired then this is the right course for you. If you ask any of the employers or project managers how to choose the best developers everyone will answer that the most important thing about the developer is to represent himself or herself with a good portfolio.",
// },
// {
//   "isEnrolled": "true",
//     "HeaderTitle":"Marketing"
// ,
//   "title": "Digital Marketing",
//   "Description":
//     "With over 20 hours of training, quizzes and practical steps you can follow - this is one of the most comprehensive digital marketing courses available. We'll cover SEO, YouTube Marketing, Facebook Marketing, Google Adwords, Google Analytics and more! Learn By Doing The course is hugely interactive with projects, checklists & actionable lectures built into every section. Learn step by step how to market a business online from scratch across all the major marketing channels. Follow the steps on screen to get results at work, for own business or for your digital marketing clients.",
// }
// ]
