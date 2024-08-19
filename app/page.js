'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Modal from './modal_component';

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [messageInput, setMessageInput] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: 'How can I help you learn more about Saurabh and his Resume?',
    },
  ]);

  useEffect(() => {
    document.body.classList.toggle('dark-mode', isDarkMode);
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const toggleMobileMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleHeadingClick = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const submitForm = async (e) => {
    e.preventDefault();
    let newMessages = [...messages, { role: 'user', content: messageInput }];
    setMessages(newMessages);
    setMessageInput('');
    try {
      const res = await fetch('/api', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ messages: newMessages }),
      });
      if (!res.ok) {
        throw new Error('Network response was not ok');
      }
      const apiMessage = await res.json();
      setMessages([
        ...newMessages,
        { role: 'assistant', content: apiMessage.message },
      ]);
    } catch (error) {
      console.error('Error:', error);
      setMessages([
        ...newMessages,
        {
          role: 'assistant',
          content: 'There was an error processing your request.',
        },
      ]);
    }
  };

  return (
    <>
      <header>
        <h3 className="logo-holder">
          <button onClick={toggleDarkMode} className="logo">
            {isDarkMode ? '☽' : '🔆'}
          </button>
          <div className="logo-text">Portfolio Website</div>
        </h3>
        <nav>
          <ul id="menu" className={menuOpen ? 'active' : ''}>
            <li>
              <a href="#work experience">Work Experience</a>
            </li>
            <li>
              <a href="#skills">Skills</a>
            </li>
            <li>
              <a href="#projects">Projects</a>
            </li>
            <li>
              <a href="mailto:saurabhu294@gmail.com" className="button">
                Contact Me
              </a>
            </li>
            <li>
              <div className="hilogo" onClick={handleHeadingClick}>
                ✍
              </div>
            </li>
          </ul>
          <a href="#" className="mobile-toggle" onClick={toggleMobileMenu}>
            <svg
              className="w-6 h-6 text-gray-800 dark:text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeWidth="2"
                d="M5 7h14M5 12h14M5 17h10"
              />
            </svg>
          </a>
        </nav>
      </header>
      {isModalOpen && <Modal onClose={closeModal} />}
      <main>
        <section className="hero container">
          <div className="hero-blue">
            <div>
              <h1>
                <small>Hi I&apos;m</small>
                Saurabh Upadhyay
              </h1>
              <p>
                Aspiring Developer who takes keen interest in learning new tech
                stacks.
              </p>
              <div className="call-to-action">
                <a
                  href="./saurabhresume.pdf"
                  className="button black"
                >
                  View Resume
                </a>
                <a href="mailto:saurabhu294@gmail.com" className="button white">
                  Contact Me
                </a>
              </div>
              <div className="social-links">
                <a href="https://github.com/neo7812">
                  <Image
                    src="/imgs/github.png"
                    alt="GitHub"
                    width={48}
                    height={48}
                  />
                </a>
                <a href="https://www.linkedin.com/in/saurabh-upadhyay-60b2721a7/">
                  <Image
                    src="/imgs/linkedin.png"
                    alt="LinkedIn"
                    width={48}
                    height={48}
                  />
                </a>
              </div>
            </div>
          </div>
          <div className="hero-yellow">
            <Image
              src="/imgs/hero-image.png"
              alt="Saurabh Upadhyay"
              layout="responsive"
              width={700}
              height={475}
            />
          </div>
        </section>
        <section className="logos container">
          <div className="marquee">
            <div className="track">
              <Image src="/imgs/html.png" alt="HTML" width={128} height={128} />
              <Image src="/imgs/css.png" alt="CSS" width={128} height={128} />
              <Image
                src="/imgs/javascript.png"
                alt="JS"
                width={128}
                height={128}
              />
              <Image
                src="/imgs/react.png"
                alt="React"
                width={128}
                height={128}
              />
              <Image
                src="/imgs/nextjs.png"
                alt="Next JS"
                width={128}
                height={128}
              />
              <Image
                src="/imgs/azure.png"
                alt="Azure"
                width={128}
                height={128}
              />
              <Image
                src="/imgs/vscode.png"
                alt="VS Code"
                width={128}
                height={128}
              />
              <Image src="/imgs/html.png" alt="HTML" width={128} height={128} />
              <Image src="/imgs/css.png" alt="CSS" width={128} height={128} />
              <Image
                src="/imgs/javascript.png"
                alt="JS"
                width={128}
                height={128}
              />
              <Image
                src="/imgs/react.png"
                alt="React"
                width={128}
                height={128}
              />
              <Image
                src="/imgs/nextjs.png"
                alt="Next JS"
                width={128}
                height={128}
              />
              <Image
                src="/imgs/azure.png"
                alt="Azure"
                width={128}
                height={128}
              />
              <Image
                src="/imgs/vscode.png"
                alt="VS Code"
                width={128}
                height={128}
              />
            </div>
          </div>
        </section>
        <section id="skills" className="skills container">
          <h2>Skills</h2>
          <div className="holder-blue">
            <div className="left-column">
              <h3>Frontend</h3>
              <ul>
                <li>HTML</li>
                <li>CSS</li>
                <li>JavaScript</li>
                <li>React</li>
                <li>Nextjs</li>
              </ul>
              <h3>Backend</h3>
              <ul>
                <li>Node.js</li>
                <li>Express</li>
                <li>MongoDB</li>
              </ul>
            </div>
            <div className="right-column">
              <h3>A bit about me</h3>
              <p>
                Hi I&apos;m Saurabh Upadhyay, Aspiring developer who takes keen
                interest in learning different tech stacks and implementing them
                in projects.
              </p>
              <p>
                I have used Azure AI to create a chatbot that can help answer
                questions about my resume. Feel free to ask anything related to
                resume.
              </p>
            </div>
          </div>
        </section>
        <section id="work experience" className="work-experience container">
          <h2>Work Experience</h2>
          <div className="jobs">
            <article>
              <figure>
                <div>
                  <Image
                    src="/imgs/workplace-1.jpg"
                    alt="Workplace-Genpact"
                    width={700}
                    height={700}
                    style={{ width: '100%', height: '100%' }}
                  />
                  <figcaption>Workplace - Genpact</figcaption>
                </div>
              </figure>
              <h3>Genpact- Senior Associate</h3>
              <div>2023-current</div>
              <p>Master Data Management</p>
            </article>
          </div>
        </section>
        <section id="projects" className="bento container">
          <h2>Projects</h2>
          <div className="bento-grid">
            <a
              href="https://nextjs-project-beta-one.vercel.app/"
              className="bento-item"
            >
              <Image
                src="/imgs/bento-1.png"
                alt="BGCCI"
                width={400}
                height={300}
                style={{ width: '100%', height: '100%' }}
              />
            </a>
            {/* <a href="#" className="bento-item">
              <Image
                src="/imgs/bento-2.jpg"
                alt="Churhview"
                width={400}
                height={300}
                style={{ width: '100%', height: '100%' }}
              />
            </a>
            <a href="#" className="bento-item">
              <Image
                src="/imgs/bento-3.jpg"
                alt="Harley"
                width={400}
                height={300}
                style={{ width: '100%', height: '100%' }}
              />
            </a>
            <a href="#" className="bento-item">
              <Image
                src="/imgs/bento-5.jpg"
                alt="Bunbury"
                width={400}
                height={300}
                style={{ width: '100%', height: '100%' }}
              />
            </a>
            <a href="#" className="bento-item">
              <Image
                src="/imgs/bento-6.jpg"
                alt="Running"
                width={400}
                height={300}
                style={{ width: '100%', height: '100%' }}
              />
            </a> */}
            <a
              href="https://saas-landing-page-wine.vercel.app/"
              className="bento-item"
            >
              <Image
                src="/imgs/bento-7.png"
                alt="School"
                width={400}
                height={300}
                style={{ width: '100%', height: '100%' }}
              />
            </a>
          </div>
        </section>
        <section className="chatbot container">
          <h2>
            <small>Talk to me</small>
            Chatbot
          </h2>
          <div className="chatbot-blue">
            <div className="chat-info">
              <h3>Azure AI Chatbot</h3>
              <p>
                I&apos;ve put together a chatbot here which knows all my skills,
                work experience and has a copy of my Resume. You can use it to
                ask questions about me to get a better idea of who I am and what
                I&apos;ve done.
              </p>
              <p>
                You can also download my resume here if you want to take a look
                at it. I&apos;m currently looking for new opportunities so if
                you have a project you think I&apos;d be a good fit for, please
                get in touch!
              </p>
              <a
                href="./saurabhresume.pdf"
                className="button black"
              >
                Download Resume
              </a>
            </div>
            <div className="chat-box">
              <div className="scroll-area">
                <ul id="chat-log">
                  {messages.map((message, index) => (
                    <li key={index} className={`${message.role}`}>
                      <span className={`avatar`}>
                        {message.role === 'user' ? 'You' : 'AI'}
                      </span>
                      <div className="message">{message.content}</div>
                    </li>
                  ))}
                </ul>
              </div>
              <form onSubmit={submitForm} className="chat-message">
                <input
                  type="text"
                  placeholder="Hey Saurabh, what skills are you best at?"
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                />
                <button className="button black">Send</button>
              </form>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
