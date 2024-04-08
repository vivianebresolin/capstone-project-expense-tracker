import { collection, addDoc, doc, updateDoc, deleteDoc, getDoc, getDocs } from 'firebase/firestore';
import { formatDateToDB, parseStringToFloat } from '../utils/utils';
import { db } from './config';
import { getUniqueId } from '../utils/deviceInfo';

export async function addExpense(amount, description, date, category) {
  const newExpense = {
    amount: parseStringToFloat(amount),
    description: description,
    date: formatDateToDB(date),
    category: category
  };

  try {
    const deviceId = await getUniqueId();
    const docRef = await addDoc(collection(db, 'users', deviceId, 'expenses'), newExpense);
    return {
      ...newExpense,
      id: docRef.id
    };
  } catch (e) {
    return null;
  }
}

export async function updateExpense(expense) {
  try {
    const deviceId = await getUniqueId();
    const expenseRef = doc(db, 'users', deviceId, 'expenses', expense.id);

    const expenseDoc = await getDoc(expenseRef);
    if (!expenseDoc.exists()) {
      return null;
    }

    // Update the expense data
    const updatedExpense = {
      amount: parseStringToFloat(expense.amount),
      description: expense.description,
      date: formatDateToDB(expense.date),
      category: expense.category,
    };

    await updateDoc(expenseRef, updatedExpense);

    return {
      ...updatedExpense,
      id: expense.id,
    };
  } catch (e) {
    console.error('Error updating expense:', e);
    return null;
  }
}

export async function deleteExpense(id) {
  try {
    const deviceId = await getUniqueId();
    const expenseRef = doc(db, 'users', deviceId, 'expenses', id);
    await deleteDoc(expenseRef);
    return id;
  } catch (error) {
    console.error('Error deleting expense: ', error);
    return null;
  }
}


export async function deleteAllData() {
  try {
    const deviceId = await getUniqueId();
    const expenseRef = collection(db, 'users', deviceId, 'expenses');
    console.log('my device is is ', deviceId);

    // Get all documents in the collection
    const querySnapshot = await getDocs(expenseRef);

    // Map over each document and delete it
    const deletePromises = querySnapshot.docs.map(async (doc) => {
      await deleteDoc(doc.ref);
    });

    // Wait for all deletion promises to complete
    await Promise.all(deletePromises);

    console.log('All data deleted successfully');
  } catch (error) {
    console.error('Error deleting data:', error);
    throw error;
  }
}
