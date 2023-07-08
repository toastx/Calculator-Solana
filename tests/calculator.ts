const assert = require('assert')
const anchor = require('@project-serum/anchor')
const {SystemProgram} = anchor.web3

describe("calculator", () => {
  const provider = anchor.AnchorProvider.env()
  anchor.setProvider(provider)
  const calculator = anchor.web3.Keypair.generate()
  const program = anchor.workspace.Calculator

    it('Creates a calculator', async() =>{
        await program.methods.create("good eye mate")
            .accounts({
                calculator: calculator.publicKey,
                user: provider.wallet.publicKey,
                systemProgram: SystemProgram.programId
        })
            .signers([calculator])
            .rpc()


        
        const account = await program.account.calculator.fetch(calculator.publicKey)

        assert.ok(account.greeting == "good eye mate")
        console.log(account.greeting.toString());
    });

    it('Adds two numbers',async() => {
        await program.methods.add(new anchor.BN(2),new anchor.BN(3))
        .accounts({
            calculator:calculator.publicKey
        })
        .rpc()

        const account = await program.account.calculator.fetch(calculator.publicKey)
        assert.ok(account.result.eq(new anchor.BN(5)))
        console.log(account.result.toString());
        
    });

    it('Subtract two numbers',async() => {
        await program.methods.subtract(new anchor.BN(5),new anchor.BN(1))
        .accounts({
            calculator:calculator.publicKey
        })
        .rpc()
        const account = await program.account.calculator.fetch(calculator.publicKey)
        console.log(account.result.toString());
        assert.ok(account.result.eq(new anchor.BN(4)))
        
    });
    it('Multiplication two numbers',async() => {
        await program.methods.mul(new anchor.BN(5),new anchor.BN(3))
        .accounts({
            calculator:calculator.publicKey
        })
        .rpc()
        const account = await program.account.calculator.fetch(calculator.publicKey)
        console.log(account.result.toString());
        assert.ok(account.result.eq(new anchor.BN(15)))
        
    });
    it('Division two numbers',async() => {
        await program.methods.div(new anchor.BN(17),new anchor.BN(5))
        .accounts({
            calculator:calculator.publicKey
        })
        .rpc()
        const account = await program.account.calculator.fetch(calculator.publicKey)
        console.log(account.result.toString());
        console.log(account.remainder.toString());
        assert.ok(account.result.eq(new anchor.BN(3)))
        assert.ok(account.remainder.eq(new anchor.BN(2)))
        
    });
});
