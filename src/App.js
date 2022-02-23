import React, {useEffect, useState} from 'react';
import './styles/App.css';
import twitterLogo from './assets/twitter-logo.svg';
import { ethers } from 'ethers';
import contractABI from './utils/contractABI.json';

import polygonLogo from './assets/polygonlogo.png';
import ethLogo from './assets/ethlogo.png';
import { networks } from './utils/networks';



// Constants
const TWITTER_HANDLE = '0xtoto8';
const BUILDSPACE = '_buildspace';
const TWITTER_LINK = `https://twitter.com/${TWITTER_HANDLE}`;
const TWITTER_BUILDSPACE = `https://twitter.com/${BUILDSPACE}`;
const CONTRACT_ADDRESS = '0x151ddC087a84144eF4f79E946aD980720fBcc62A';
const tld = '.king';



const App = () => {
	const [currentAccount, setCurrentAccount] = useState('');
	const [domain, setDomain] = useState('');
	const [record, setRecord] = useState(''); 
	const [network, setNetwork] = useState('');
    
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

	const mintDomain = async () =>{
		if(!domain) { return }
		if(domain.length < 3){
			alert('domain must be at least 3 characters long');
			return;
		}
		const price = domain.length === 3 ? '0.3' : domain.length === 4 ? '0.3' : '0.1';
		console.log("Minting domain", domain, " with price: ", price);
		try{
			const { ethereum } = window;
			if (ethereum){
				const provider = new ethers.providers.Web3Provider(ethereum);
				const signer = provider.getSigner();
				const contract = new ethers.Contract(CONTRACT_ADDRESS, contractABI.abi, signer);

				console.log("going to pop wallet now to pay gas...");
				let tx = await contract.register(domain, {value: ethers.utils.parseEther(price)});

				const receipt = await tx.wait();

				if(receipt.status ===1){
					console.log("Domain minted! https://mumbai.polygonscan.com/tx/"+tx.hash);

					tx =  await contract.setRecord(domain, record);
					await tx.wait();

					console.log("Record set! https://mumbai.polygonscan.com/tx/"+tx.hash);
					setRecord('');
					setDomain('');
				}else{ alert('Transaction failed! Please try again!');}
			}

		}catch(error){
			console.error(error);
		}
	}
	
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
		return (
			<div className="form-container">
				<div className="first-row">
					<input
						type="text"
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

				<div className="button-container">
					<button className='cta-button mint-button' onClick={mintDomain}>
						Mint
					</button>  
					<button className='cta-button mint-button' disabled={null} onClick={null}>
						Set data
					</button>  
				</div>

			</div>
		);
	}
  
	useEffect(() => {
		checkIfWalletIsConnected();
	}, []);


  return (
		<div className="App">
			<div className="container">
				<div className="header-container">
				<header>
           			<div className="left">
              		<p className="title"> 👑King Name Service</p>
              		<p className="subtitle">Your Royalty DNS for matic!</p>
           		 </div>
					<div className='right'>
						<img alt="Network logo" className='logo' src={ network.includes("Polygon ") ? polygonLogo : ethLogo}/>
						{currentAccount ? <p>Wallet: {currentAccount.slice(0, 6)}...{currentAccount.slice(-4)}</p> : <p>Not connected</p>}
					</div>
				</header>
			</div>
			{!currentAccount && renderNotConnectedContainer()}
			{currentAccount && renderInputForm()}
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
