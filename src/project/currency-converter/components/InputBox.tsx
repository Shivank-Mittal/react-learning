import { useId } from 'react';

type inputProps = {
  label: string;
  amount: number | undefined;
  currencyOptions: string[];
  selectedCurrency: string;
  currencyChangeDisable: false;
  onAmountChange: (amount: number) => void;
  onCurrencyChange: (currency: string) => void;
  className: string;
};

export default function InputBox({
  label,
  amount,
  currencyOptions = [],
  onAmountChange,
  onCurrencyChange,
  selectedCurrency = 'usd',
  currencyChangeDisable = false,
  className = ''
}: inputProps) {
  const amountId = useId();
  return (
    <div className={`bg-white p-3 rounded-lg text-sm flex ${className}`}>
      <div className="w-1/2">
        <label htmlFor="amountId" className="text-black/40 mb-2 inline-block">
          {label}
        </label>
        <input
          id={amountId}
          className="outline-none w-full bg-transparent py-1.5"
          type="number"
          placeholder="Amount"
          disabled={currencyChangeDisable}
          value={amount}
          onChange={(event) => onAmountChange && onAmountChange(Number(event.target.value))}
        />
      </div>
      <div className="w-1/2 flex flex-wrap justify-end text-right">
        <p className="text-black/40 mb-2 w-full">Currency Type</p>
        <select
          value={selectedCurrency}
          onChange={(e) => onCurrencyChange && onCurrencyChange(e.target.value)}
          className="rounded-lg px-1 py-1 bg-gray-100 cursor-pointer outline-none"
        >
          {currencyOptions.map((currency) => (
            <option key={currency} value={currency}>
              {' '}
              {currency}{' '}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
