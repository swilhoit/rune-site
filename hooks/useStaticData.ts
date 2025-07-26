import { useState, useEffect } from 'react';
import { Biomarker, Symptom, Remedy } from '@/lib/bigquery';

// Cache the data in memory after first load
let cachedBiomarkers: Biomarker[] | null = null;
let cachedSymptoms: Symptom[] | null = null;
let cachedRemedies: Remedy[] | null = null;

export function useStaticBiomarkers() {
  const [biomarkers, setBiomarkers] = useState<Biomarker[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadData() {
      try {
        // Use cached data if available
        if (cachedBiomarkers) {
          setBiomarkers(cachedBiomarkers);
          setLoading(false);
          return;
        }

        // Load from static JSON file
        const response = await fetch('/data/biomarkers.json');
        if (!response.ok) throw new Error('Failed to load biomarkers');
        
        const data = await response.json();
        cachedBiomarkers = data;
        setBiomarkers(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load data');
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  return { biomarkers, loading, error };
}

export function useStaticSymptoms() {
  const [symptoms, setSymptoms] = useState<Symptom[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadData() {
      try {
        if (cachedSymptoms) {
          setSymptoms(cachedSymptoms);
          setLoading(false);
          return;
        }

        const response = await fetch('/data/symptoms.json');
        if (!response.ok) throw new Error('Failed to load symptoms');
        
        const data = await response.json();
        cachedSymptoms = data;
        setSymptoms(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load data');
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  return { symptoms, loading, error };
}

export function useStaticRemedies() {
  const [remedies, setRemedies] = useState<Remedy[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadData() {
      try {
        if (cachedRemedies) {
          setRemedies(cachedRemedies);
          setLoading(false);
          return;
        }

        const response = await fetch('/data/remedies.json');
        if (!response.ok) throw new Error('Failed to load remedies');
        
        const data = await response.json();
        cachedRemedies = data;
        setRemedies(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load data');
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  return { remedies, loading, error };
}

// Hook for individual biomarker
export function useStaticBiomarker(id: string) {
  const { biomarkers, loading, error } = useStaticBiomarkers();
  const biomarker = biomarkers.find(b => b.id === id) || null;
  
  return { biomarker, loading, error };
}

// Hook for individual symptom
export function useStaticSymptom(id: string) {
  const { symptoms, loading, error } = useStaticSymptoms();
  const symptom = symptoms.find(s => s.id === id) || null;
  
  return { symptom, loading, error };
}

// Hook for individual remedy
export function useStaticRemedy(id: string) {
  const { remedies, loading, error } = useStaticRemedies();
  const remedy = remedies.find(r => r.id === id) || null;
  
  return { remedy, loading, error };
}