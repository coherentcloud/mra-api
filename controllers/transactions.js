const Transaction = require('../models/Transaction');

// @desc Get All Transactions 
// @route   GET /api/v1/mra/transactions
// @access  Public 

exports.getTransactions = async (req, res, next) => {
    try {
        const transactions = await Transaction.find();
        return res.status(200).json({
            success:true,
            count: transactions.length,
            data: transactions
        });
    } catch (error) {
        return res.send(500).json({
            success:false,
            error: 'Server Error'
        });
    }
}

// @desc    Add Transaction 
// @route   POST /api/v1/mra/transactions
// @access  Public 

exports.addTransactions = async (req, res, next) => {
    try {
        const { description, amount, tran_type } = req.body;
        const transaction = await Transaction.create(req.body);

        return res.status(201).json({
            success:true,
            data: transaction
        });    
        
    } catch (error) {
        if(error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(val => val.message);
      
            return res.status(400).json({
              success: false,
              error: messages
            });
        }
        else{
            return res.status(500).json({
                success: false,
                error: error.name
              });
        }
        
    }
}

// @desc    Delete Transaction 
// @route   DELETE /api/v1/mra/transactions
// @access  Public 

exports.deleteTransactions = (req, res, next) => {
    res.send('DELETE transactions');
}
