const { ethers } = require("hardhat");

async function getBalance(address: any) {
  const balanceBigInt = await ethers.waffle.provider.getBalance(address);
  return ethers.utils.formatEther(balanceBigInt);
}
async function printBalance(addresses: string) {
  let idx = 0;

  for (const address of addresses) {
    console.log(`address ${address} balance: `, await getBalance(address));
    idx++;
  }
}

async function printMemos(memos: any) {
  for (const memo of memos) {
    const timestamp = memo.timestamp;
    const tipper = memo.name;

    const tipperAddress = memo.from;
    const message = memo.message;
    console.log(`At ${timestamp},${tipper},(${tipperAddress}) said ${message}`);
  }
}

async function main() {
  const [owner, tipper, tipper2, tipper3] = await ethers.getSigners();
  const BuyMeCoffee = await ethers.getContractFactory("ByMeACoffee");
  const buyMeACoffee = await BuyMeCoffee.deploy();
  await buyMeACoffee.deployed();

  console.log("BuyMeACoffee deployed succesffully to ", buyMeACoffee.address);

  const addresses: any = [owner.address, tipper.address, buyMeACoffee.address];
  console.log("====start====");

  await printBalance(addresses);
}
main()
  .then(() => process.exit(0))
  .catch((error) => console.log(error));
