import React, { useState } from 'react';
import styled from 'styled-components';

// Form container styling
const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  padding: 30px;
  background-color: #334b7a;
  border-radius: 15px;
  margin-bottom: 50px; /* Add this line to create space at the bottom of the form */
`;

// Label styling
const Label = styled.label`
  color: #f8f9fa;
  font-weight: bold;
  font-size: 16px;
`;

// Input field styling
const Input = styled.input`
  border: 1px solid #ced4da;
  border-radius: 4px;
  padding: 10px;
  font-size: 16px;
  color: #495057;
  outline: none;
  transition: border-color 0.2s;
  font-family: 'Titillium Web', sans-serif;

  &:focus {
    border-color: #80bdff;
  }
`;

// Submit button styling
const Button = styled.button`
  background-color: #007bff;
  border: 0px;
  border-radius: 4px;
  padding: 10px;
  color: #ffffff;
  font-size: 18px;
  cursor: pointer;
  transition: background-color 0.2s;
  font-family: 'Titillium Web', sans-serif;

  &:hover {
    background-color: #0056b3;
  }
`;

const TooltipText = styled.span`
  visibility: ${(props) => (props.isVisible ? 'visible' : 'hidden')};
  opacity: ${(props) => (props.isVisible ? '1' : '0')};
  width: 200px;
  background-color: #455d8c;
  color: #f8f9fa;
  text-align: center;
  border-radius: 6px;
  padding: 10px;
  font-size: 14px;
  position: absolute;
  z-index: 1;
  top: -85px;
  left: 50%;
  transform: translateX(-50%);
  font-family: 'Titillium Web', sans-serif;

  &:after {
    content: "";
    position: absolute;
    bottom: -10px;
    left: 50%;
    margin-left: -5px;
    border-width: 5px;
    border-style: solid;
    border-color: #1b2b4a transparent transparent transparent;
  }
`;

const Tooltip = styled.span`
  position: relative;
  display: inline-block;
  cursor: pointer;
  color: #f8f9fa;
  font-size: 16px;
  font-weight: bold;
  margin-left: 5px;
  border: 1px solid #f8f9fa;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  line-height: 20px;
  text-align: center;
  a {
    color: #f8f9fa;
    text-decoration: underline;
    transition: color 0.2s;
  }

  a:hover {
    color: #b3d4fc;
    text-decoration: underline;
  }
`;

// Container for API key label and tooltip
const TooltipContainer = styled.div`
  display: flex;
  align-items: center;
`;

const InputForm = ({ apiKey, setApiKey, youtubeUrl, setYoutubeUrl, handleSubmit }) => {
  const [tooltipVisible, setTooltipVisible] = useState(false);

  const showTooltip = () => {
    setTooltipVisible(true);
  };

  const hideTooltip = () => {
    setTooltipVisible(false);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <TooltipContainer>
        <Label htmlFor="api-key">API Key</Label>
        <Tooltip onMouseEnter={showTooltip} onMouseLeave={hideTooltip}>
          ?
          <TooltipText isVisible={tooltipVisible}>
            To obtain an API key, go to <a target="_blank" href="https://www.assemblyai.com/dashboard/signup">assemblyai.com</a> and follow the instructions.
          </TooltipText>
        </Tooltip>
      </TooltipContainer>
      <Input
        id="api-key"
        type="password"
        placeholder="Enter Your AssemblyAI API Key"
        value={apiKey}
        onChange={(e) => setApiKey(e.target.value)}
      />
      <Label htmlFor="youtube-url">YouTube URL</Label>
      <Input
        id="youtube-url"
        type="text"
        placeholder="Enter YouTube URL"
        value={youtubeUrl}
        onChange={(e) => setYoutubeUrl(e.target.value)}
      />
      <Button type="submit">Process</Button>
    </Form>
  );
};

export default InputForm;
