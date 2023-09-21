export interface Uniswap {
    data: UniswapWrapper;
}

export interface UniswapWrapper {
    data: Data;
}

export interface Data {
    tokens: Token[];
}

export interface Token {
    id:       string;
    name:     string;
    symbol:   string;
    decimals: number;
}

export const uniswapQuery = `
query {
    tokens(first: 100) {
      id
      name
      symbol
      decimals
    }
  }
  
`