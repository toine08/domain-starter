import React, {useEffect, useState} from 'react';
import './styles/App.css';
import twitterLogo from './assets/twitter-logo.svg';

// Constants
const TWITTER_HANDLE = '0xtoto8';
const BUILDSPACE = '_buildspace';
const TWITTER_LINK = `https://twitter.com/${TWITTER_HANDLE}`;
const TWITTER_BUILDSPACE = `https://twitter.com/${BUILDSPACE}`;



const App = () => {
	const [currentAccount, setCurrentAccount] = useState('');
	const [domain, setDomain] = useState('');
	const [record, setRecord] = useState(''); 
    
	// Implement your connectWallet method here
	const connectWallet = async () => {
		try {
			const { ethereum } = window;

			if (!ethereum) {
				alert("Get MetaMask -> https://metamask.io/");
				return;
			}

			// Fancy method to request access to account.
			const accounts = await ethereum.request({ method: "eth_requestAccounts" });
		
			// Boom! This should print out public address once we authorize Metamask.
			console.log("Connected", accounts[0]);
			setCurrentAccount(accounts[0]);
		} catch (error) {
			console.log(error)
		}
	}

	const checkIfWalletIsConnected = async () => {
		const { ethereum } = window;

		if (!ethereum) {
			console.log('Make sure you have metamask!');
			return;
		} else {
			console.log('We have the ethereum object', ethereum);
		}

		const accounts = await ethereum.request({ method: 'eth_accounts' });

		if (accounts.length !== 0) {
			const account = accounts[0];
			console.log('Found an authorized account:', account);
			setCurrentAccount(account);
		} else {
			console.log('No authorized account found');
		}
	};
	
	const renderNotConnectedContainer = () => {
		return(
			<div className='connect-wallet-container'>
				<img src='https://media.giphy.com/media/zGnnFpOB1OjMQ/giphy.gif' alt="lord of the rings gif" />
				<button className='cta-button connect-wallet-button' onClick={connectWallet}>
					Connect wallet
				</button>
			</div>
		)
	};


	const renderInputForm = () =>{
		return(
			<div className='form-container'>
				<div className="first-row">
					<input
						type='text'
						value={domain}
						placeholder='domain'
						onChange={e => setDomain(e.target.value)} 
					/>
					<p className='tld'> {tld} </p>
				</div>
				<input 
					type="text"
					value={record}
					placeholder='whats ur title ?'
					onChange={e => setRecord(e.target.value)}

				/>

			</div>
		)
	};

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
			{!currentAccount && renderNotConnectedContainer()}
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
