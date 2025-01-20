import { Injectable } from '@nestjs/common';
import Web3 from 'web3';
import { contractABI } from '../contractAbi';

@Injectable()
export class Web3Service {
  private web3: Web3;
  private contract: any;

  constructor() {
    this.web3 = new Web3(process.env.WEB3_INFURA_URL);
    const address = process.env.WEB3_ADDRESS;
    this.contract = new this.web3.eth.Contract(contractABI, address);
  }

  getContract() {
    return this.contract;
  }

  async getPastEvents(
    eventName: string,
    fromBlock: number | string = 'earliest',
  ): Promise<any[]> {
    const contract = this.getContract();
    return contract.getPastEvents(eventName, {
      fromBlock,
      toBlock: 'latest',
    });
  }
}
