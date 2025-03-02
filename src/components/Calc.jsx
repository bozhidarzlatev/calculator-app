import { useState, useEffect } from 'react';
import '../components/Calculator.css';
import { evaluate } from 'mathjs';


export default function  Calculator() {
    const [history , setHistory ] = useState('No input')
    const [query, setQuery] = useState('')
    const [total, setTotal] = useState(0)
    const [keyPressed, setKeyPressed] = useState(null)    

    
    function ButtonClicked(value) {
        
        
        if (query === '' && !nums.includes(value)) {
            
            setQuery(prevQuery => prevQuery = total)
        }
        
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

        if (value === '√') {
            try {
                setTotal(Math.sqrt(parseFloat(query)));
                setHistory(`√(${query})`)
                setQuery('')
            } catch (error) {
                setTotal('Error')
                setQuery('Error')
            }
            return
        }

        if (value === '<') {
            const sliced = query.slice(0 , -1)
            
            setQuery(prev => prev = sliced)
            return
        }
        
        if (value === '=') {
            
            try {
                let result = evaluate(query);
                if (result.toString().length > 10) {
                    result = Number(result.toPrecision(9));
                }

                setQuery(prev => prev += value)  
                setTotal(result);
                setHistory(old => old = query);
                setQuery('');
                
            } catch (error) {
                setTotal('Error')
                setQuery('Error')
            }
            
        }
    }

    useEffect(() => {
        function handleKeyPress(event) {
            const {key} = event

            
            if (keys.includes(key)) {
                setKeyPressed(key)
                ButtonClicked(key)
            } else if ( key === 'Enter') {
                setKeyPressed('=')
                ButtonClicked('=')
                
            } else if ( key === 'Backspace') {
                setKeyPressed('<')
                ButtonClicked('<')
            } else if ( key === 'Delete') {
                setKeyPressed('AC')
                ButtonClicked('AC')
            }
            
        }
        
        function handleKeyUp(params) {
            setKeyPressed(null)
            
        }

        window.addEventListener('keydown', handleKeyPress)
        window.addEventListener('keyup', handleKeyUp)
        
        return () => {
            window.removeEventListener('keydown', handleKeyPress)
            window.removeEventListener('keyup', handleKeyUp)

        };
    }, [query])

    const nums = ['1','2','3','4','5','6','7','8','9','0'];
    const keys = ["AC", "√", "%", "/", "7", "8", "9", "*", "4", "5", "6", "-", "1", "2", "3", "+", "<", "0", ".", "="];
    const orangeKeys = ["/", "*", "-", "+", "="];

    return (
        <>
          <h3>Calculat<span><img src="logo.png"  /></span>r</h3> 
            <div className="calculator">
                <div className='display'>
                    <div className='total'>Total: {total}</div>
                    <div className='query'> {query.length > 25 ? `...${query.slice(-25)}` : query !== '' ? query :history.length > 25 ? `...${history.slice(-25)}` : history}</div>
                </div>
                <div className="keypad">
                    {keys.map((key) => (
                        <div 
                            key={key} 
                            className={`key ${orangeKeys.includes(key) ? 'orange' : ''}
                        ${keyPressed === key ? 'pressed' : ""}`} 
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