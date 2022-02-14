#!/usr/bin/env node

import sha256 from 'crypto-js/sha256.js';
import Base64 from 'crypto-js/enc-base64.js';
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc.js'
dayjs.extend(utc)

const HEADER_AUTHORIZATION = "Auth";
const HEADER_DATE  = "Date";
const HEADER_NONCE = "Nonce";
const HEADER_R     = "R";
const ROLE         = "BSM";

function generateNonce() {
  return Math.floor(Math.random() * 10000);
}

function generateDate() {
  const date = new Date();
  return dayjs.utc().format('YYYY-MM-DDTHH:mm:ss')
}


function generateAuthorization(headerNonce, dateString, userEmail, token, path, httpMethod) {
  const content   = token + ":" + path + "," + httpMethod + "," + dateString + ","+ ROLE+ "," + headerNonce;
  const digest    = sha256(content);
  const encoded64 = Base64.stringify(digest);
  return encoded64;

}

function buildSecurityHeaders(userEmail, token, path, httpMethod) {

	const headers = new Map();
	const headerNonce = generateNonce();
	const headerDate = generateDate();
	const headerAuthorization = generateAuthorization(headerNonce, headerDate, userEmail, token, path, httpMethod);

	headers.set(HEADER_NONCE, headerNonce);
	headers.set(HEADER_DATE, headerDate);
	headers.set(HEADER_AUTHORIZATION, headerAuthorization);
	headers.set(HEADER_R, ROLE);

	return headers;
}
  
									  
const headers = buildSecurityHeaders("test@mailinator.com", "TOKEN", "/v1/rewards", "GET");				
console.log( headers.get(HEADER_NONCE));
console.log( headers.get(HEADER_DATE));
console.log( headers.get(HEADER_AUTHORIZATION));
console.log( headers.get(HEADER_R));


