import contactpic from "../images/contactpic.png"

const Contact = () => {

    const content = (
        <>
        <section className="p-4 mt-24 mb-10" id="head">
          <div className="flex items-center flex-col-reverse md:flex-row justify-around px-4">
              <div>
                <img src={contactpic} alt="sculpted head" loading="lazy"></img>
              </div>
              <div>
                <p className="font-semibold text-3xl font-inter py-4 text-black">contact me</p>
                <div className="flex flex-col gap-y-8">
                  <p className="font-inter font-semibold text-4xl md:text-7xl underline hover:text-blue-600 duration-500 ease-in-out text-black"><a href="mailto:ericobiwulu@gmail.com" target="blank_" aria-label="Send a mail" rel="noopener noreferrer">send a mail</a></p>
                  <p className="font-inter font-semibold text-4xl md:text-7xl underline hover:text-purple-600 duration-500 ease-in-out text-black"><a href="https://twitter.com/lyfof_thames" target="blank_" rel="noopener noreferrer">pay me a visit on X</a></p>
                  <p className="font-inter font-semibold text-4xl md:text-7xl underline hover:text-pink-600 duration-500 ease-in-out text-black"><a href="https://www.linkedin.com/in/obiwulu-god-swill-eric-485627224/" target="blank_" rel="noopener noreferrer">check my Linkedin</a></p>
                </div>
              </div>
          </div>
        </section>
        </>
    )
  return content
}

export default Contact