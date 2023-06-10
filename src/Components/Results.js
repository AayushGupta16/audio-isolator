import React from 'react';
import styled from 'styled-components';

const ResultsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  justify-items: center;
  gap: 15px;
  max-width: 1200px;
  margin: 0 auto;
`;

const Card = styled.div`
  background-color: #334A79; 
  border: 0px;
  border-radius: 15px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 88%; // Cards will take up full column width
  padding: 20px;
  margin-bottom: 30px;
`;

const CardTitle = styled.h4`
  color: #f8f9fa;
  font-weight: bold;
  text-align: center;
  margin-bottom: 15px;
`;

const Audio = styled.audio`
  width: 100%;
  margin-bottom: 10px;
`;

const DownloadLink = styled.a`
  color: #007bff;
  text-decoration: none;

  &:hover {
    color: #0056b3;
    text-decoration: none;
  }
`;



const Results = ({ results }) => {
  // check if results and results.audio_files is defined and is an array
  if (results && Array.isArray(results.audio_files)) {
    return (
      <ResultsContainer>
        {results.audio_files.map((audioFile, index) => (
          <Card key={index}>
            <CardTitle>{audioFile.name}</CardTitle>
            <Audio controls>
              <source src={`data:audio/mpeg;base64,${audioFile.data}`} type="audio/mpeg" />
              Your browser does not support the audio element.
            </Audio>
            <div className="text-center mt-2">
              <DownloadLink href={`data:audio/mpeg;base64,${audioFile.data}`} download={`${audioFile.name}.mp3`}>
                Download
              </DownloadLink>
            </div>
          </Card>
        ))}
      </ResultsContainer>
    );
  } else {
    // Return an alternative component or null if results or results.audio_files is not defined or not an array
    return null;
  }
};

export default Results;
