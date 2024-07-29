
const InstagramFeed = () => {
    const content = (
        <>
            <div className="flex justify-center my-8">
            <iframe
                src="https://www.instagram.com/embed-feed?hashtag=cooking"
                width="100%"
                height="500"
                frameBorder="0"
                scrolling="no"
                allow="encrypted-media"
                title="Instagram Feed"
                className="border-none max-w-md"
            ></iframe>
            </div>
        </>
    )
  return content 
};

export default InstagramFeed;
