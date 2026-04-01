import React,{useState} from "react";

const QuickExpense = ({onAddExpense})=>{
    const [title,setTitle] = useState('');
    const [amount,setAmount] = useState('');

    const handleSubmit = (e)=>{
        e.preventDefault();
        if (!title || !amount) return;
        onAddExpense(title, amount);
        setTitle(''); 
        setAmount('');
    }

    return(
        <>
            <form onSubmit={handleSubmit} className="flex flex-col gap-2 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                <h4 className="text-[10px] uppercase font-bold text-slate-400 tracking-widest mb-1">Log Extra Cost</h4>
                <div className="flex gap-2">
                    <input 
                    type="text" 
                    placeholder="e.g. Dinner" 
                    className="flex-1 bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-emerald-500"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    />
                    <input 
                    type="number" 
                    placeholder="₹" 
                    className="w-20 bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-emerald-500"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    />
                    <button type="submit" className="bg-emerald-800 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-emerald-900 transition-colors">
                    Add
                    </button>
                </div>
            </form>
        </>
    )
}

export default QuickExpense;