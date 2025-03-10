import React from 'react';
import { Bell, Shield, Users, Smartphone, Wifi, Database, Clock } from 'lucide-react';

function Settings() {
  return (
    <div className="max-w-4xl space-y-6">
      <h1 className="text-2xl font-semibold text-gray-900">Paramètres</h1>

      <div className="bg-white shadow rounded-lg divide-y">
        {/* Notifications Settings */}
        <div className="p-6">
          <div className="flex items-center space-x-3">
            <Bell className="w-5 h-5 text-gray-500" />
            <h2 className="text-lg font-medium">Notifications</h2>
          </div>
          <div className="mt-4 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Notifications par Email</p>
                <p className="text-sm text-gray-500">Recevoir les mises à jour par email</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Notifications Push</p>
                <p className="text-sm text-gray-500">Notifications urgentes sur mobile</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
          </div>
        </div>

        {/* Mobile App Settings */}
        <div className="p-6">
          <div className="flex items-center space-x-3">
            <Smartphone className="w-5 h-5 text-gray-500" />
            <h2 className="text-lg font-medium">Application Mobile</h2>
          </div>
          <div className="mt-4 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Mode Hors-ligne</p>
                <p className="text-sm text-gray-500">Synchronisation des données pour utilisation hors-ligne</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Synchronisation Automatique</p>
                <p className="text-sm text-gray-500">Synchroniser les données dès que possible</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Compression des Images</p>
                <p className="text-sm text-gray-500">Réduire la taille des images avant l'envoi</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
          </div>
        </div>

        {/* Data Management */}
        <div className="p-6">
          <div className="flex items-center space-x-3">
            <Database className="w-5 h-5 text-gray-500" />
            <h2 className="text-lg font-medium">Gestion des Données</h2>
          </div>
          <div className="mt-4 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Stockage Local</p>
                <p className="text-sm text-gray-500">Limite de stockage pour les données hors-ligne</p>
              </div>
              <select className="rounded-lg border-gray-300 text-sm">
                <option>100 MB</option>
                <option>250 MB</option>
                <option>500 MB</option>
                <option>1 GB</option>
              </select>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Fréquence de Synchronisation</p>
                <p className="text-sm text-gray-500">Intervalle de synchronisation automatique</p>
              </div>
              <select className="rounded-lg border-gray-300 text-sm">
                <option>15 minutes</option>
                <option>30 minutes</option>
                <option>1 heure</option>
                <option>4 heures</option>
              </select>
            </div>
          </div>
        </div>

        {/* Security Settings */}
        <div className="p-6">
          <div className="flex items-center space-x-3">
            <Shield className="w-5 h-5 text-gray-500" />
            <h2 className="text-lg font-medium">Sécurité</h2>
          </div>
          <div className="mt-4">
            <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700">
              Changer le Mot de Passe
            </button>
          </div>
        </div>

        {/* Team Settings */}
        <div className="p-6">
          <div className="flex items-center space-x-3">
            <Users className="w-5 h-5 text-gray-500" />
            <h2 className="text-lg font-medium">Gestion de l'Équipe</h2>
          </div>
          <div className="mt-4">
            <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700">
              Gérer les Membres de l'Équipe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Settings;