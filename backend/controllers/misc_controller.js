import { getAllCountries } from '../services/misc_service.js';

// Obtenir tous les restaurants
export async function getAllCountriesHandler(req, res) {
    try {
        const countries = await getAllCountries();
        res.status(200).json(countries);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
