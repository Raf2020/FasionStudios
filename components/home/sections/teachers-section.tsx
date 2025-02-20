import TeacherThumb from "../teacher-thumb";

const HomeTeachersSections = () => {
  const teachers = [
    {
      name: "Sophia Martinez",
      profession: "Contemporary and Jazz",
      description:
        "Sophia has over 10 years of experience teaching contemporary and jazz dance to students of all levels. She’s known for her expressive choreography and has worked on several stage productions and music videos.",
      image: "/images/home/teacher-1.svg",
    },
    {
      name: "Ethan Carter",
      profession: "Hip-Hop and Breakdancing",
      description:
        "Ethan is a high-energy dance instructor with a background in street dancing and hip-hop. He’s competed in international breakdance battles and loves teaching creative freestyle techniques.",
      image: "/images/home/teacher-2.svg",
    },
    {
      name: "Lila Gupta",
      profession: "Classical Indian Dance",
      description:
        "Lila is a trained Bharatanatyam dancer with a modern twist. She combines traditional Indian dance forms with contemporary styles to create unique performances. She’s also a certified yoga instructor.",
      image: "/images/home/teacher-3.svg",
    },
  ];

  return (
    <div className="w-full pb-8 px-6 sm:pb-20 sm:px-15">
      <div className="mb-8 sm:mb-20 pb-4 border-b-[1px] border-b-black">
        <p className="text-black text-base font-medium">OUR TEACHERS</p>
      </div>
      <div className="flex pb-8 sm:pb-20 flex-col gap-2">
        <p className="text-black text-2xl sm:text-[52px] sm:leading-[72px]">
          Meet our world class teachers
        </p>
        <p className="max-w-xl text-black text-base leading-[30px]">
          Our passionate teachers come from every corner of the globe, bringing
          their expertise and love for movement to inspire our young dancers.
        </p>
      </div>
      <div className="flex w-full flex-col sm:flex-row gap-6">
        {teachers.map((teacher, index) => (
          <TeacherThumb
            key={index}
            name={teacher.name}
            profession={teacher.profession}
            description={teacher.description}
            image={teacher.image}
          />
        ))}
      </div>
    </div>
  );
};

export default HomeTeachersSections;
