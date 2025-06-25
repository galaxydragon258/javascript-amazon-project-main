import { Dollors } from "../scripts/moenyConverte.js";



describe('test suit, formaCurrency',()=>{
    it('convert cents to dollors',()=>{

        expect(Dollors(2095)).toEqual('20.95');

    });


    it('works with zero',()=>{
        expect(Dollors(0)).toEqual('0.00');
    })
    
    it('work with roundup',()=>{
        expect(Dollors(2000.5)).toEqual('20.01');
    })
})