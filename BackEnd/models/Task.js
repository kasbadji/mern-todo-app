const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  completed: { type: Boolean, default: false },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Task', taskSchema);

//type: mongoose.Schema.Types.ObjectId → ça dit que la valeur est un identifiant d’un autre document MongoDB.
//ref: 'User' → ça indique que cet ID pointe vers la collection users.
//required: true → aucune tâche ne peut exister sans être liée à un utilisateur.