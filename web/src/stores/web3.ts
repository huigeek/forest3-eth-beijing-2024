import * as ethers from "ethers";
import { flow, makeAutoObservable } from "mobx";
import { useToast } from "~/components/ui/use-toast";

const { toast } = useToast();
export class Web3Store {
  chainId = "";
  selectedAddress = "";
  createLoading = false;
  w3: any = null;
  empty = false;

  creatorList = [];

  constructor() {
    makeAutoObservable(this);
  }

  connect = (res: any) => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    if (res?.chainId !== chainId) {
      this.connectChain();
    } else {
      this.chainId = res?.chainId;
    }
    this.selectedAddress = res?.selectedAddress;
    this.w3 = provider;
  };

  connectToMetaMask = flow(function* (this: Web3Store) {
    try {
      const eth = window.ethereum;
      if (!eth) {
        toast({
          title: "warning",
          content: "Please install metamask to use the website",
        });
        return;
      }
      if (eth.selectedAddress === null) {
        yield eth.enable();
        this.connect(eth);
      } else if (eth.isConnected()) {
        this.connect(eth);
      }
    } catch (error) {
      console.log("err", error);
    }
  });

  connectChain = flow(function* (this: Web3Store) {
    try {
      const eth = window.ethereum;
      if (!eth) {
        toast({
          title: "warning",
          content: "Please install metamask to use the website",
        });
        return;
      }
      yield eth.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId }],
      });
      this.chainId = chainId;
    } catch (error) {
      toast({
        title: "warning",
        content: "Please switch to the appropriate chainId.",
      });
    }
  });
}
