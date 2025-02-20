import { useEffect, useState } from 'react';
import useCurrencyInfo from './hooks/useCurrencyInfo';
import InputBox from './components/InputBox';

export default function CurrencyConverter() {
  const [amount, setAmount] = useState(0);
  const [convertedAmount, setConvertedAmount] = useState(0);
  const [fromSelectedCurrency, setFromSelectedCurrency] = useState('usd');
  const [toSelectedCurrency, setToSelectedCurrency] = useState('inr');
  // const [currencyChangeDisable, setCurrencyChangeDisable] = useState(false);
  const [currencyOptions, setCurrencyOptions] = useState(new Array<string>());

  const onAmountChange = (amountChanged: number) => setAmount(amountChanged);
  const onFromCurrencyChange = (changedCurrency: string) =>
    setFromSelectedCurrency(changedCurrency);
  const onToCurrencyChange = (changedCurrency: string) => setToSelectedCurrency(changedCurrency);

  const currencyInfo = useCurrencyInfo(fromSelectedCurrency);

  useEffect(() => {
    fetch('https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies.json')
      .then((data) => data.json())
      .then((data) => Object.keys(data))
      .then((data) => setCurrencyOptions(data as string[]));
  }, []);

  const convert = () => setConvertedAmount(amount * currencyInfo[toSelectedCurrency]);

  return (
    <div className="w-full h-screen flex flex-wrap justify-center items-center bg-cover bg-no-repeat">
      <div className="w-full">
        <div className="w-full max-w-md mx-auto border border-gray-60 rounded-lg p-5 backdrop-blur-sm bg-white/30">
          <form
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <div className="w-full mb-1">
              <InputBox
                label="From"
                amount={amount}
                currencyOptions={currencyOptions}
                onAmountChange={(amountChanged) => onAmountChange(amountChanged)}
                onCurrencyChange={(newCurrency) => onFromCurrencyChange(newCurrency)}
                selectedCurrency={fromSelectedCurrency}
                currencyChangeDisable={false}
                className=""
              />
            </div>
            <div className="relative w-full h-0.5">
              <button
                type="button"
                className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-white rounded-md bg-blue-600 text-white px-2 py-0.5"
              >
                {' '}
                swap
              </button>
            </div>
            <div className="w-full mt-1 mb-4">
              <InputBox
                label="To"
                amount={convertedAmount}
                currencyOptions={currencyOptions}
                onAmountChange={(amountChanged) => onAmountChange(amountChanged)}
                onCurrencyChange={(newCurrency) => onToCurrencyChange(newCurrency)}
                selectedCurrency={toSelectedCurrency}
                currencyChangeDisable={false}
                className=""
              />
            </div>
            <button
              onClick={() => convert()}
              type="submit"
              className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg"
            >
              Convert {fromSelectedCurrency.toUpperCase()} to {toSelectedCurrency.toUpperCase()}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
