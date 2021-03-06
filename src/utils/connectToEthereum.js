import { ethers, providers } from "ethers";
import abi from "../ShareSmile.json";

const address = "0xCecF7AfC5C5f91073F70FCe82c3A7975FF05d517";

export async function connectToEthereum() {
	const { ethereum } = window;

	const accounts = await ethereum.request({ method : "eth_requestAccounts" });
	console.log(accounts);
}

export async function isWalletConnected() {
	var provider = new ethers.providers.Web3Provider(window.ethereum);
	const accounts = await provider.listAccounts();
	return accounts.length > 0;
}

export async function sendSmile(name, message) {
	if (!(await isWalletConnected()))
		await connectToEthereum();
	try {
		const addressContract = address;
		const provider = new ethers.providers.Web3Provider(window.ethereum);
		const signer = provider.getSigner();
		const contract = new ethers.Contract(addressContract, abi.abi, signer);
		await contract.addSmile(name, message);
		console.log(name, message);
	} catch (error) {
		alert('Sending smile failed, plz try again, don\'t loose hope');
	}
}

export async function getTotalSmiles() {
	if(!isWalletConnected())
		connectToEthereum();

	try {
		const addressContract = address;
		const provider = new ethers.providers.Web3Provider(window.ethereum);
		const signer = provider.getSigner();
		const contract = new ethers.Contract(addressContract, abi.abi, signer);
		let totalSmiles = await contract.getTotalSmiles();
		console.log(totalSmiles.toNumber());
		return totalSmiles.toNumber();
	} catch (error) {
		throw "error in getting smiles";
	}
}

export async function getSmiles() {
	try {
		const addressContract = address;
		const provider = new ethers.providers.Web3Provider(window.ethereum);
		const contract = new ethers.Contract(addressContract, abi.abi, provider);
		const smiles = await contract.getSmiles();
		console.log(smiles);
		return smiles;
	} catch (error) {
		console.log(error);
	}
}
