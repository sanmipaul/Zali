#!/bin/bash
cast send 0x7409Cbcb6577164E96A9b474efD4C32B9e17d59d \
  "addQuestion(string,string[],uint256,uint256)" \
  "What does DeFi stand for?" \
  '["Decentralized Finance","Digital Finance","Distributed Finance","Direct Finance"]' \
  0 \
  100000 \
  --rpc-url https://mainnet.base.org \
  --private-key $PRIVATE_KEY \
  --legacy
