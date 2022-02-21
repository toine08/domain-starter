import React from 'react';
import './styles/App.css';
import twitterLogo from './assets/twitter-logo.svg';

// Constants
const TWITTER_HANDLE = '0xtoto8';
const BUILDSPACE = '_buildspace';
const TWITTER_LINK = `https://twitter.com/${TWITTER_HANDLE}`;
const TWITTER_BUILDSPACE = `https://twitter.com/${BUILDSPACE}`;



const App = () => {

  return (
		<div className="App">
			<div className="container">

				<div className="header-container">
					<header>
            <div className="left">
              <p className="title"> 👑King Name Service</p>
              <p className="subtitle">Your Royalty DNS for matic!</p>
            </div>
					</header>
				</div>

        <div className="footer-container">
					<img alt="Twitter Logo" className="twitter-logo" src={twitterLogo} />
					<a
						className="footer-text"
						href={TWITTER_LINK}
						target="_blank"
						rel="noreferrer"
					>{`built by @${TWITTER_HANDLE}`} || </a>
					<a
					className="footer-text"
						href={TWITTER_BUILDSPACE}
						target="_blank"
						rel="noreferrer"
					>{`created by @${BUILDSPACE}`}</a>
				</div>
			</div>
		</div>
	);
}

export default App;
