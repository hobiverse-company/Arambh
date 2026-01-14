// App - Main component with toast notifications
import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import SportSelector from './components/SportSelector';
import RegistrationForm from './components/RegistrationForm';
import { submitRegistration } from './services/api';
import './App.css';

function App() {
  const [selectedSport, setSelectedSport] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSportSelect = (sport) => {
    setSelectedSport(sport);
  };

  const handleSubmit = async (formData) => {
    setIsLoading(true);
    try {
      const result = await submitRegistration(formData);
      if (result.success) {
        toast.success('Successfully Registered!', {
          duration: 4000,
          position: 'top-center',
        });
        setSelectedSport(null); // Reset form
      } else {
        toast.error(result.error || 'Registration failed', {
          duration: 4000,
          position: 'top-center',
        });
      }
    } catch (error) {
      console.error('Submission error:', error);
      toast.error('Something went wrong. Please try again.', {
        duration: 4000,
        position: 'top-center',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="app">
      {/* Toast Container */}
      <Toaster
        toastOptions={{
          success: {
            style: {
              background: '#10B981',
              color: 'white',
            },
          },
          error: {
            style: {
              background: '#EF4444',
              color: 'white',
            },
          },
        }}
      />

      <div className="container">
        {/* Header */}
        <header className="header">
          <h1>🏆 ARAMBH 2026</h1>
          <p>College Sports Event Registration</p>
        </header>

        {/* Sport Selector */}
        <section className="card">
          <SportSelector
            onSportSelect={handleSportSelect}
            selectedSport={selectedSport}
          />
        </section>

        {/* Registration Form */}
        <section className="card">
          <RegistrationForm
            selectedSport={selectedSport}
            onSubmit={handleSubmit}
            isLoading={isLoading}
          />
        </section>

        {/* Footer */}
        <footer className="footer">
          <p>© 2026 ARAMBH Sports Event</p>
        </footer>
      </div>
    </div>
  );
}

export default App;
