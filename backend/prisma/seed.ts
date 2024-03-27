import { Course, Prisma, PrismaClient, User, Event,ForumPost, Note,Announcement } from "@prisma/client";

const client = new PrismaClient();

const getUsers = (): Prisma.UserCreateInput[] => [
  {
    name: "Yonatan Aschalew",
    email: "yonatan@gmail.com",
    password: "password123",
    image:'image1',
    role: "Refugee",
  },
  {
    name: "Mikal Afewerki",
    email: "mikal@gmail.com",
    password: "volunteer123",
    image:'image1',
    role: "Volunteer",
  },
  {
    name: "Eyuel",
    email: "eyuel@gmail.com",
    password: "adminpassword123",
    image:'image1',
    role: "Admin",
  },
];

const getAdditionalInfo = (user: User[]): Prisma.AdditionalInfoCreateInput[] => [
  {
    userInfo: {connect: {id: user[1].id}},
    phoneNumber: '9876543210',
    placeOfWork: 'XYZ Corporation',
    position: 'Designer',
    profession: 'Graphic Designer',
    expertise: 'Illustration',
    experience: 3,
    portfolioUrl: 'https://example.com/portfolio',
    linkedIn: 'https://linkedin.com/in/user2',
    availability: 'Part-time',
    additionalText: 'Additional info for user2',
  },
];

const getCourse = (): Prisma.CourseCreateInput[] => [
  {
    title: 'Introduction to Programming',
    description: 'Learn the basics of programming',
    image: 'imag1',
  },
  {
    title: 'Web Development Fundamentals',
    description: 'Introduction to web development concepts',
    image: 'imag1',
  },
];

const getEnrollments = (users: User[], courses: Course[]): Prisma.EnrollmentCreateInput[] => [
  {
    user: { connect: { id: users[0].id } },
    course: { connect: { id: courses[0].id } },
  },
  {
    user: { connect: { id: users[0].id } },
    course: { connect: { id: courses[1].id} },
  },
];

const getPrivateMessage = (users: User[]): Prisma.PrivateMessageCreateInput[] => [
  {
    sender: {connect: {id: users[1].id}},
    receiver: {connect: {id: users[0].id}},
    content: 'Hi Mikal How are you? ',
  },
  {
    sender: {connect: {id: users[0].id}},
    receiver: {connect: {id: users[1].id}},
    content: 'Hi Yonatan, I am doing Well thank you for asking How about you?',
  },
];

const getMessageAdmin = (users: User[]): Prisma.MessageAdminCreateInput[] => [
  {
    user : {connect: {id: users[1].id}},
    content: 'Advice all users please update you profile!'
  },
  {
    user : {connect: {id: users[1].id}},
    content: 'Please look at the new announcments for all refugees!'
  },
]
const getReferralLink = (users: User[]): Prisma.ReferralLinkCreateInput[] => [
  {
    user : {connect: {id: users[1].id}},
    url: 'https://g.co/kgs/Qz1B9oX'
  },
  {
    user : {connect: {id: users[1].id}},
    url: 'https://g.co/kgs/4rHeTFK'
  },
  

]

const getEvent = (users: User[]): Prisma.EventCreateInput[] => [
   {
    organizer: {connect: {id: users[1].id}},
    title: 'Event 1',
    description: 'Description for event ',
    location: 'Location1',
    image: 'imag1',

   },
   {
    organizer: {connect: {id: users[2].id}},
    title: 'Event 2',
    description: 'Description for event 2 ',
    location: 'Location2',
    image: 'imag1',

   },
]

const getEventRegistration = (users: User[], event: Event[]) : Prisma.EventRegistrationCreateInput[] => [
  {
    user: { connect: { id: users[1].id } },
    event: { connect: { id: event[0].id } },
    status: "REGISTERED",
  },
  {
    user: { connect: { id: users[2].id } },
    event: { connect: { id: event[1].id } },
    status: "CANCELLED",
  },
]

const getForumPost = (users: User[]): Prisma.ForumPostCreateInput[] => [
  {
    author: {connect: {id: users[0].id}},
    title: 'Post 1 title',
    content: 'Post 1 COntent',
    image: 'imag1',
  },
  {
    author: {connect: {id: users[0].id}},
    title: 'Post 2 title',
    content: 'Post 2 COntent',
    image: 'imag1',
  },
]

const getComment = (users: User[], forumPost: ForumPost[]) : Prisma.CommentCreateInput[] => [
  {
    author: {connect: {id: users[0].id}},
    post: {connect: {id: forumPost[1].id}},
    content: 'This is good news !'
  },
  {
    author: {connect: {id: users[1].id}},
    post: {connect: {id: forumPost[1].id}},
    content: 'This is good news for all of us!'
  },
]

const getNote = (users: User[]) : Prisma.NoteCreateInput[] => [
  {
    user: {connect: {id: users[2].id}},
    content: 'This is my firs online program!',
    image: 'imag1',
  },
]

const getAnnouncement = (users: User[]) : Prisma.AnnouncementCreateInput[] => [
{
  author: {connect: {id: users[1].id}},
  title: 'Software Update',
  content: 'New update release!',
  image: 'imag1',
},
{
  author: {connect: {id: users[1].id}},
  title: 'Software Update 1',
  content: 'New update release 1!',
  image: 'imag1',
},
]

const getJobVacancy = (): Prisma.JobVacancyCreateInput[] => [
  {
    title: 'Full Stack WebDeveloper',
    description: 'Full time Job',
    location: 'remote Job',
    image: 'imag1',
  },
  {
    title: 'Cyber Security',
    description: 'Full time Job',
    location: 'remote Job',
    image: 'imag1',
  },
  {
    title: 'FrontEnd',
    description: 'Full time Job',
    location: 'remote Job',
    image: 'imag1',
  },
]

const getNews = () : Prisma.NewsCreateInput[] => [
  {
    author: 'Yonatan',
    title: 'Omnitool',
    content: 'Generative Ai',
    image: 'imag1',
  },
  {
    author: 'Mikal',
    title: 'Data Science',
    content: ' Data Science',
    image: 'imag1',
  },
  {
    author: 'Eyuel',
    title: 'Typescript',
    content: 'Typescript vs Javascript',
    image: 'imag1',
  },
]

const getHealthFacility = () : Prisma.HealthFacilityCreateInput[] => [
  {
    name: 'Health Facility 1',
    location: 'Location 1',
    description: 'Description for Health Facility 1',
    contact: 'Contact 1',
    image: 'imag1',
  },
  {
    name: 'Health Facility 2',
    location: 'Location 2',
    description: 'Description for Health Facility 2',
    contact: 'Contact 2',
    image: 'imag1',
  },
]

const getLegalAidOrganization = () : Prisma.LegalAidOrganizationCreateInput[] => [
  {
    name: 'Legal Aid Organization 1',
    location: 'Location 1',
    description: 'Description for Local Aid Organization 1',
    contact: 'contact 1',
    image: 'imag1',

  },
  {
    name: 'Legal Aid Organization 2',
    location: 'Location 2',
    description: 'Description for Local Aid Organization 2',
    contact: 'contact 2',
    image: 'imag1',

  },
]

const getJobTrainingProgram = () : Prisma.JobTrainingProgramCreateInput[] => [
    {
      title: 'Job Training Program 1',
      location: 'Location 1',
      description: 'Description for Job Training Program 1',
      contact: 'Contact 1',
      image: 'imag1',
    },
    {
      title: 'Job Training Program 2',
      location: 'Location 2',
      description: 'Description for Job Training Program 2',
      contact: 'Contact 2',
      image: 'imag1',
    },
]

const getCommunitySupportService = () : Prisma.CommunitySupportServiceCreateInput[] => [
  {
    name: 'Community Support Service 1',
    location: 'Location 1',
    description: 'Description for Community Support Service 1',
    contact: 'Contact 1',
    image: 'imag1',
  },
  {
    name: 'Community Support Service 2',
    location: 'Location 2',
    description: 'Description for Community Support Service 2',
    contact: 'Contact 2',
    image: 'imag1',
  },
]


const main = async() => {
  const users = await Promise.all(
    getUsers().map((user) => client.user.create({data:user}))
  );
  const additionalInfo = await Promise.all(
    getAdditionalInfo(users).map((additionalInfo) => client.additionalInfo.create({data: additionalInfo}))
  );
  const courses = await Promise.all(
    getCourse().map((course) => client.course.create({data: course}))
  );
  const enrollments = await Promise.all(
    getEnrollments(users, courses).map((enrollment) => client.enrollment.create({data: enrollment}))
  );
  const privateMessages = await Promise.all(
    getPrivateMessage(users).map((privateMessage) => client.privateMessage.create({data: privateMessage}))
  );
  const messageAdmin = await Promise.all(
    getMessageAdmin(users).map((messageAdmin) => client.messageAdmin.create({data: messageAdmin}))
  );
  const referralLinks = await Promise.all(
    getReferralLink(users).map((referralLink) => client.referralLink.create({data: referralLink}))
  );
  const event = await Promise.all(
    getEvent(users).map((events) => client.event.create({data: events}))
  );
  const eventRegistration = await Promise.all (
    getEventRegistration(users,event).map((eventRegistration) => client.eventRegistration.create({data: eventRegistration}))
  );
  const forumPost = await Promise.all(
    getForumPost(users).map((forumPost) => client.forumPost.create({data: forumPost}))
  );
  const comment = await Promise.all(
    getComment(users,forumPost).map((comment) => client.comment.create({data: comment}))
  );
  const note = await Promise.all(
    getNote(users).map((notes) => client.note.create({data: notes}))
  );

  const announcment = await Promise.all(
    getAnnouncement(users).map((announcement) => client.announcement.create({data: announcement}))
  );
  const jobVacancy = await Promise.all(
    getJobVacancy().map((jobVacancy) => client.jobVacancy.create({data:jobVacancy}))
  );
  const news = await Promise.all(
    getNews().map((news) => client.news.create({data:news}))
  );
  const healthFacility = await Promise.all(
    getHealthFacility().map((healthFacility) => client.healthFacility.create({data:healthFacility}))
  );
  const legalAidOrganization = await Promise.all(
    getLegalAidOrganization().map((legalAidOrganization) => client.legalAidOrganization.create({data:legalAidOrganization}))
  );
  const jobTrainingProgram= await Promise.all(
    getJobTrainingProgram().map((jobTrainingProgram) => client.jobTrainingProgram.create({data:jobTrainingProgram}))
  );

  const communitySupportService = await Promise.all(
    getCommunitySupportService().map((communitySupportService) => client.communitySupportService.create({data: communitySupportService}))
  )
};

main();