import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithubSquare } from "@fortawesome/free-brands-svg-icons";
import { faBlog, faEnvelope } from "@fortawesome/free-solid-svg-icons";

interface Data {
  name: string;
  img: string;
  email: string;
  github: string;
  blog: string;
  intro: string;
  career: string;
}

const data: Data[] = [
  {
    name: "박지원",
    img: "https://avatars.githubusercontent.com/u/124653132?v=4",
    email: "ndwoo33@gmail.com",
    github: "https://github.com/Jiwonp12",
    blog: "https://studyhard-everyday.tistory.com/",
    intro: "매일 꾸준하게 성장하는 프론트엔드 개발자 박지원입니다.",
    career:
      "[플립드러닝] 멀티미디어콘텐츠제작(영상편집&웹제작)구직자과정 수료, 코드스테이츠 프론트엔드 부트캠프 44기 수료",
  },
  {
    name: "김진솔",
    img: "https://avatars.githubusercontent.com/u/80370226?v=4",
    email: "wlsthf75@gamil.com",
    github: "https://github.com/jinsoul75",
    blog: "https://summerr.tistory.com/",
    intro:
      "프론트엔드 개발자로서 창의적인 솔루션을 제공하는 김진솔입니다. 다양한 프로젝트에서 동적인 웹 애플리케이션을 개발하는 데 능숙하며, React와 Vue.js 같은 프레임워크를 주로 사용합니다.",
    career:
      "유튜브 크리에이터 '쏠킴 SOLKIM' 활동,\n코드스테이츠 프론트엔드 부트캠프 44기 수료",
  },
  {
    name: "박무생",
    img: "https://avatars.githubusercontent.com/u/124570875?s=400&u=9d5e547ecc4366c617f03a86a2936afe509edba3&v=4",
    email: "antod123@naver.com",
    github: "https://github.com/Mooobi",
    blog: "https://velog.io/@antod2981",
    intro:
      "한 걸음씩 꾸준히 성장하는 개발자가 되고 싶은 박무생입니다.\n문제 해결 과정에서 끊임없이 고민하며 결과를 도출하는 것을 좋아하고 단순히 알기보디는 경험을 통한 학습을 중요하게 생각합니다.",
    career:
      "서울과학기술대학교 건축공학과 졸업,\n(전)경남 거제시 건축직 지방공무원(2019-2022),\n코드스테이츠 프론트엔드 부트캠프 44기 수료",
  },
  {
    name: "이진화",
    img: "https://avatars.githubusercontent.com/u/122351417?v=4",
    email: "jinhwa.lee.57@gmail.com",
    github: "https://github.com/JeanneLee57",
    blog: "https://sulki.tistory.com",
    intro:
      "함께 일하고 싶은 개발자가 되고 싶은 이진화입니다. 현재에 만족하지 않고 끊임없이 새로운 것을 배우는 것에서 가장 큰 보람을 느낍니다.",
    career: "코드스테이츠 프론트엔드 부트캠프 44기 수료",
  },
];

const AboutPage = () => {
  return (
    <div className="w-full p-12 flex flex-col">
      <div className="flex flex-col items-center mb-10">
        <b className="text-lg mb-6">게시판 프로젝트</b>
        <p className="text-lg mb-2">
          Next.JS를 이용한 게시판 만들기 솔로 프로젝트로, 새로운 스택들을
          사용하여 역량을 늘리고 팀원들과 코드리뷰를 통해 피드백을 주고받는
          방식으로 진행하였습니다.
        </p>
        <p>프로젝트 기간: 05.23 ~ 06.09</p>
      </div>
      <div className="flex flex-col items-center mb-10">
        <b className="text-lg my-6">팀원 소개</b>
        <ul className="w-full flex justify-center">
          {data.map(member => (
            <li key={member.name} className="flex flex-col items-center mx-4">
              <Image
                src={member.img}
                alt="memberImg"
                width={150}
                height={150}
                className="drop-shadow-lg rounded-full mb-4 hover:scale-110 transition duration-200"
              />
              <b>{member.name}</b>
            </li>
          ))}
        </ul>
      </div>
      {data.map(member => (
        <div key={member.name} className="flex flex-col items-center my-10">
          <b className="text-lg mb-4">{member.name}</b>
          <p className="text-lg mb-2">{member.intro}</p>
          <p className="text-lg mb-4">{member.career}</p>
          <a
            className="flex items-center mb-1 hover:text-blue-500 transition duration-200"
            href={member.github}
          >
            <FontAwesomeIcon
              icon={faGithubSquare}
              className="w-[20px] h-[20px] mr-1"
            />
            {member.github}
          </a>
          <a
            className="flex items-center mb-1 hover:text-blue-500 transition duration-200"
            href={member.blog}
          >
            <FontAwesomeIcon icon={faBlog} className="w-[20px] h-[20px] mr-1" />
            {member.blog}
          </a>
          <p className="flex items-center">
            <FontAwesomeIcon
              icon={faEnvelope}
              className="w-[20px] h-[20px] mr-1"
            />
            {member.email}
          </p>
        </div>
      ))}
    </div>
  );
};

export default AboutPage;
