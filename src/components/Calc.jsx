import { useState, useEffect } from 'react';
import '../components/Calculator.css';
import { evaluate } from 'mathjs';


export default function  Calculator() {
    const [history , setHistory ] = useState('No input')
    const [query, setQuery] = useState('')
    const [total, setTotal] = useState(0)
    

    function ButtonClicked(value) {
        if (total === 'Error' || query === 'AC') {
            setQuery('')
            setTotal(0)
        }

        setQuery(prev => prev + value)       
        
        if (value === 'AC') {
            setQuery('AC');
            setTotal(0)
            return
        }

        if (value === '<') {
            const sliced = query.slice(0 , -1)
            
            setQuery(prev => prev = sliced)
            return
        }
        
        if (value === '=') {
            try {
                setQuery(prev => prev += value)       
                setTotal(evaluate(query));
                setHistory(old => old = query);
                setQuery('');
                
            } catch (error) {
                setTotal('Error')
                setQuery('Error')
            }
            
        }
        
    }

    const keys = ["AC", "+/-", "%", "/", "7", "8", "9", "*", "4", "5", "6", "-", "1", "2", "3", "+", "<", "0", ",", "="];
    const orangeKeys = ["/", "*", "-", "+", "="];

    return (
        <>
          <h3>Calculator</h3>
            <div className="calculator">
                <div className='display'>
                    <div className='query'>{query !== '' ? query: history}</div>
                    <div className='string'>Total: {total}</div>
                </div>
                <div className="keypad">
                    {keys.map((key) => (
                        <div 
                            key={key} 
                            className={`key ${orangeKeys.includes(key) ? 'orange' : ''}`} 
                            onClick={() => ButtonClicked(key)}
                        >
                            {key}
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
    
}