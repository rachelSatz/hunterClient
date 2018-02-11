import { Employer } from "./employer.model";
import { Manufacturer } from "./manufacturer.model";
import { BankBranch } from "./bank-branch.model";
import { Process } from "./process.model";

export class SendFile {
    id: number;
    employer: Employer;
    manufacturer: Manufacturer;
    bankBranch: BankBranch;
    accountNumber: string
    paymentDate: string;
    remark: string
    statusSafeBoxes: number; //GeneralEnums.SentToSafeBoxes 
    kindPay: number;//GeneralEnums.KindPay ///Masab_gaml| Masab_Supplier|check
    process: Process;
    sumFile: number;
    fileName: string;
    productType: number;// GeneralEnums.AgentProductType //'Kupat_Gemel' | 'Keren_Pensia' | 'Bituah_Menahalim'
    monthValueDate: string;

    constructor() {
        this.employer = new Employer();
        this.manufacturer = new Manufacturer();
        this.bankBranch = new BankBranch();
        this.process = new Process();
    }
}