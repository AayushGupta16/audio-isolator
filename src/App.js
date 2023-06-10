import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import posthog from 'posthog-js';
import InputForm from './Components/InputForm';
import Loading from './Components/Loading';
import Results from './Components/Results';

posthog.init('phc_E6M5XGK759ftF4Lgr10HPPkBn8g9fc8fYSF9fWHH5z5', { api_host: 'https://app.posthog.com' });

const Container = styled.div`
  font-family: 'Titillium Web', sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  padding: 20px;
  background-color: #1f2c47;
`;

const Heading = styled.h1`
  color: #FFFFFF;
  margin-bottom: 10px;
  font-size: 44px;
`;

const Description = styled.p`
  min-width: 80px;
  width: 60%;
  color: #FFFFFF;
  margin-bottom: 40px;
  text-align: center;
`;

const Footer = styled.footer`
  text-align: center;
  padding: 20px;
  background-color: #f8f9fa;
  color: #6c757d;
  font-size: 14px;
`;

function App() {
  const [apiKey, setApiKey] = useState('');
  const [youtubeUrl, setYoutubeUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);

  useEffect(() => {
    posthog.capture('pageview');
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    posthog.capture('video-processing-request');  // Only capturing the event

    const processVideo = async (userApiKey, youtubeUrl) => {
      try {
        const response = await fetch('https://speakerisolatorapi.com/process_video', { 
          method: 'POST',
          headers: { 'Content-Type': 'application/json' }, 
          body: JSON.stringify({ api_key: userApiKey, youtube_url: youtubeUrl }), 
        });
        const data = await response.json();
        console.log(data);
        setResults(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };
    processVideo(apiKey, youtubeUrl);
  };

  return (
    <>
      <Container>
        <Heading>YouTube Speaker Isolator</Heading>
        <Description>Hey everyone, I made this website so you can isolate clips of individual speakers from a Youtube Video. To use, get an API key from AssemblyAI and paste the url of the Youtube video you want to convert. Your API Key is never stored, and let me know if you have any suggestions at aayushgupta@startupshell.org. Heads up, videos will normally take 1/10 of their runtime to process, and podcasts / interviews work best. </Description>
        <InputForm
          apiKey={apiKey}
          setApiKey={setApiKey}
          youtubeUrl={youtubeUrl}
          setYoutubeUrl={setYoutubeUrl}
          handleSubmit={handleSubmit}
        />
        {loading ? <Loading /> : results && <Results results={results} />}
      </Container>
      <Footer>Made by Aayush Gupta at UMD's Startup Shell</Footer>
    </>
  );
}

export default App;
