// Selenium automation for adding products via the browser form
import fs from 'fs';
import path from 'path';
import { Builder, By, Key, until } from 'selenium-webdriver';
import 'chromedriver';

// Read product data from CSV or JSON (for this demo, hardcoded array)
const products = [
    {
        productID: 'BL001',
        name: 'Body Lotions 1',
        altNames: 'body lotions',
        price: '1500',
        labeledPrice: '1850',
        description: 'Premium body lotion for daily hydration.',
        imagePath: 'C:/Users/wickr/Desktop/CBC/Crystal-Beauty-Clear/public/CBCProducts_extracted/Body lotions/WhatsApp Image 2025-08-11 at 14.30.05.jpeg',
        stock: '20'
    },
    {
        productID: 'BL002',
        name: 'Body Lotions 2',
        altNames: 'body lotions',
        price: '1600',
        labeledPrice: '1950',
        description: 'Premium body lotion for daily hydration.',
        imagePath: 'C:/Users/wickr/Desktop/CBC/Crystal-Beauty-Clear/public/CBCProducts_extracted/Body lotions/WhatsApp Image 2025-08-11 at 14.30.06 (1).jpeg',
        stock: '21'
    },
    {
        productID: 'BL003',
        name: 'Body Lotions 3',
        altNames: 'body lotions',
        price: '1700',
        labeledPrice: '2050',
        description: 'Premium body lotion for daily hydration.',
        imagePath: 'C:/Users/wickr/Desktop/CBC/Crystal-Beauty-Clear/public/CBCProducts_extracted/Body lotions/WhatsApp Image 2025-08-11 at 14.30.06.jpeg',
        stock: '25'
    },
    {
        productID: 'BL004',
        name: 'Body Lotions 4',
        altNames: 'body lotions',
        price: '1800',
        labeledPrice: '2150',
        description: 'Premium body lotion for daily hydration.',
        imagePath: 'C:/Users/wickr/Desktop/CBC/Crystal-Beauty-Clear/public/CBCProducts_extracted/Body lotions/WhatsApp Image 2025-08-11 at 14.30.07 (1).jpeg',
        stock: '23'
    },
    {
        productID: 'BL005',
        name: 'Body Lotions 5',
        altNames: 'body lotions',
        price: '1900',
        labeledPrice: '2250',
        description: 'Premium body lotion for daily hydration.',
        imagePath: 'C:/Users/wickr/Desktop/CBC/Crystal-Beauty-Clear/public/CBCProducts_extracted/Body lotions/WhatsApp Image 2025-08-11 at 14.30.07 (2).jpeg',
        stock: '22'
    },
    {
        productID: 'BL006',
        name: 'Body Lotions 6',
        altNames: 'body lotions',
        price: '2000',
        labeledPrice: '2350',
        description: 'Premium body lotion for daily hydration.',
        imagePath: 'C:/Users/wickr/Desktop/CBC/Crystal-Beauty-Clear/public/CBCProducts_extracted/Body lotions/WhatsApp Image 2025-08-11 at 14.30.07.jpeg',
        stock: '21'
    },
    {
        productID: 'BL007',
        name: 'Body Lotions 7',
        altNames: 'body lotions',
        price: '2100',
        labeledPrice: '2450',
        description: 'Premium body lotion for daily hydration.',
        imagePath: 'C:/Users/wickr/Desktop/CBC/Crystal-Beauty-Clear/public/CBCProducts_extracted/Body lotions/WhatsApp Image 2025-08-11 at 14.30.08 (1).jpeg',
        stock: '24'
    },
    {
        productID: 'BL008',
        name: 'Body Lotions 8',
        altNames: 'body lotions',
        price: '2200',
        labeledPrice: '2550',
        description: 'Premium body lotion for daily hydration.',
        imagePath: 'C:/Users/wickr/Desktop/CBC/Crystal-Beauty-Clear/public/CBCProducts_extracted/Body lotions/WhatsApp Image 2025-08-11 at 14.30.08.jpeg',
        stock: '23'
    },
    {
        productID: 'FW001',
        name: 'Face Wash Cleanser 1',
        altNames: 'face wash, cleansers',
        price: '1200',
        labeledPrice: '1550',
        description: 'Gentle face wash for all skin types.',
        imagePath: 'C:/Users/wickr/Desktop/CBC/Crystal-Beauty-Clear/public/CBCProducts_extracted/face wash cleansers/WhatsApp Image 2025-08-11 at 13.40.33 (1).jpeg',
        stock: '23'
    },
    {
        productID: 'FW002',
        name: 'Face Wash Cleanser 2',
        altNames: 'face wash, cleansers',
        price: '1300',
        labeledPrice: '1650',
        description: 'Gentle face wash for all skin types.',
        imagePath: 'C:/Users/wickr/Desktop/CBC/Crystal-Beauty-Clear/public/CBCProducts_extracted/face wash cleansers/WhatsApp Image 2025-08-11 at 13.40.33 (2).jpeg',
        stock: '25'
    },
    {
        productID: 'FW003',
        name: 'Face Wash Cleanser 3',
        altNames: 'face wash, cleansers',
        price: '1400',
        labeledPrice: '1750',
        description: 'Gentle face wash for all skin types.',
        imagePath: 'C:/Users/wickr/Desktop/CBC/Crystal-Beauty-Clear/public/CBCProducts_extracted/face wash cleansers/WhatsApp Image 2025-08-11 at 13.40.33.jpeg',
        stock: '21'
    },
    {
        productID: 'FW004',
        name: 'Face Wash Cleanser 4',
        altNames: 'face wash, cleansers',
        price: '1500',
        labeledPrice: '1850',
        description: 'Gentle face wash for all skin types.',
        imagePath: 'C:/Users/wickr/Desktop/CBC/Crystal-Beauty-Clear/public/CBCProducts_extracted/face wash cleansers/WhatsApp Image 2025-08-11 at 13.40.34 (1).jpeg',
        stock: '24'
    },
    {
        productID: 'FW005',
        name: 'Face Wash Cleanser 5',
        altNames: 'face wash, cleansers',
        price: '1600',
        labeledPrice: '1950',
        description: 'Gentle face wash for all skin types.',
        imagePath: 'C:/Users/wickr/Desktop/CBC/Crystal-Beauty-Clear/public/CBCProducts_extracted/face wash cleansers/WhatsApp Image 2025-08-11 at 13.40.34.jpeg',
        stock: '20'
    },
    {
        productID: 'FW006',
        name: 'Face Wash Cleanser 6',
        altNames: 'face wash, cleansers',
        price: '1700',
        labeledPrice: '2050',
        description: 'Gentle face wash for all skin types.',
        imagePath: 'C:/Users/wickr/Desktop/CBC/Crystal-Beauty-Clear/public/CBCProducts_extracted/face wash cleansers/WhatsApp Image 2025-08-11 at 13.40.35 (1).jpeg',
        stock: '23'
    },
    {
        productID: 'FW007',
        name: 'Face Wash Cleanser 7',
        altNames: 'face wash, cleansers',
        price: '1800',
        labeledPrice: '2150',
        description: 'Gentle face wash for all skin types.',
        imagePath: 'C:/Users/wickr/Desktop/CBC/Crystal-Beauty-Clear/public/CBCProducts_extracted/face wash cleansers/WhatsApp Image 2025-08-11 at 13.40.35.jpeg',
        stock: '24'
    },
    {
        productID: 'FW008',
        name: 'Face Wash Cleanser 8',
        altNames: 'face wash, cleansers',
        price: '1900',
        labeledPrice: '2250',
        description: 'Gentle face wash for all skin types.',
        imagePath: 'C:/Users/wickr/Desktop/CBC/Crystal-Beauty-Clear/public/CBCProducts_extracted/face wash cleansers/WhatsApp Image 2025-08-11 at 13.40.36 (1).jpeg',
        stock: '22'
    },
    {
        productID: 'FW009',
        name: 'Face Wash Cleanser 9',
        altNames: 'face wash, cleansers',
        price: '2000',
        labeledPrice: '2350',
        description: 'Gentle face wash for all skin types.',
        imagePath: 'C:/Users/wickr/Desktop/CBC/Crystal-Beauty-Clear/public/CBCProducts_extracted/face wash cleansers/WhatsApp Image 2025-08-11 at 13.40.36.jpeg',
        stock: '24'
    },
    {
        productID: 'FW010',
        name: 'Face Wash Cleanser 10',
        altNames: 'face wash, cleansers',
        price: '2100',
        labeledPrice: '2450',
        description: 'Gentle face wash for all skin types.',
        imagePath: 'C:/Users/wickr/Desktop/CBC/Crystal-Beauty-Clear/public/CBCProducts_extracted/face wash cleansers/WhatsApp Image 2025-08-11 at 13.40.37.jpeg',
        stock: '20'
    },
    {
        productID: 'LB001',
        name: 'Lip Balm 1',
        altNames: 'lip balm',
        price: '800',
        labeledPrice: '1150',
        description: 'Nourishing lip balm for soft lips.',
        imagePath: 'C:/Users/wickr/Desktop/CBC/Crystal-Beauty-Clear/public/CBCProducts_extracted/lip balm/WhatsApp Image 2025-08-11 at 14.26.25 (1).jpeg',
        stock: '25'
    },
    {
        productID: 'LB002',
        name: 'Lip Balm 2',
        altNames: 'lip balm',
        price: '850',
        labeledPrice: '1200',
        description: 'Nourishing lip balm for soft lips.',
        imagePath: 'C:/Users/wickr/Desktop/CBC/Crystal-Beauty-Clear/public/CBCProducts_extracted/lip balm/WhatsApp Image 2025-08-11 at 14.26.25 (2).jpeg',
        stock: '23'
    },
    {
        productID: 'LB003',
        name: 'Lip Balm 3',
        altNames: 'lip balm',
        price: '900',
        labeledPrice: '1250',
        description: 'Nourishing lip balm for soft lips.',
        imagePath: 'C:/Users/wickr/Desktop/CBC/Crystal-Beauty-Clear/public/CBCProducts_extracted/lip balm/WhatsApp Image 2025-08-11 at 14.26.25.jpeg',
        stock: '22'
    },
    {
        productID: 'LB004',
        name: 'Lip Balm 4',
        altNames: 'lip balm',
        price: '950',
        labeledPrice: '1300',
        description: 'Nourishing lip balm for soft lips.',
        imagePath: 'C:/Users/wickr/Desktop/CBC/Crystal-Beauty-Clear/public/CBCProducts_extracted/lip balm/WhatsApp Image 2025-08-11 at 14.26.26.jpeg',
        stock: '25'
    },
    {
        productID: 'MZ001',
        name: 'Moisturizer 1',
        altNames: 'moisturizers',
        price: '1800',
        labeledPrice: '2150',
        description: 'Deeply hydrating moisturizer.',
        imagePath: 'C:/Users/wickr/Desktop/CBC/Crystal-Beauty-Clear/public/CBCProducts_extracted/Moisturizers/WhatsApp Image 2025-08-11 at 14.19.32 (1).jpeg',
        stock: '24'
    },
    {
        productID: 'MZ002',
        name: 'Moisturizer 2',
        altNames: 'moisturizers',
        price: '1850',
        labeledPrice: '2200',
        description: 'Deeply hydrating moisturizer.',
        imagePath: 'C:/Users/wickr/Desktop/CBC/Crystal-Beauty-Clear/public/CBCProducts_extracted/Moisturizers/WhatsApp Image 2025-08-11 at 14.19.32.jpeg',
        stock: '25'
    },
    {
        productID: 'MZ003',
        name: 'Moisturizer 3',
        altNames: 'moisturizers',
        price: '1900',
        labeledPrice: '2250',
        description: 'Deeply hydrating moisturizer.',
        imagePath: 'C:/Users/wickr/Desktop/CBC/Crystal-Beauty-Clear/public/CBCProducts_extracted/Moisturizers/WhatsApp Image 2025-08-11 at 14.19.33 (1).jpeg',
        stock: '22'
    },
    {
        productID: 'MZ004',
        name: 'Moisturizer 4',
        altNames: 'moisturizers',
        price: '1950',
        labeledPrice: '2300',
        description: 'Deeply hydrating moisturizer.',
        imagePath: 'C:/Users/wickr/Desktop/CBC/Crystal-Beauty-Clear/public/CBCProducts_extracted/Moisturizers/WhatsApp Image 2025-08-11 at 14.19.33.jpeg',
        stock: '20'
    },
    {
        productID: 'MZ005',
        name: 'Moisturizer 5',
        altNames: 'moisturizers',
        price: '2000',
        labeledPrice: '2350',
        description: 'Deeply hydrating moisturizer.',
        imagePath: 'C:/Users/wickr/Desktop/CBC/Crystal-Beauty-Clear/public/CBCProducts_extracted/Moisturizers/WhatsApp Image 2025-08-11 at 14.19.34 (1).jpeg',
        stock: '24'
    },
    {
        productID: 'MZ006',
        name: 'Moisturizer 6',
        altNames: 'moisturizers',
        price: '2050',
        labeledPrice: '2400',
        description: 'Deeply hydrating moisturizer.',
        imagePath: 'C:/Users/wickr/Desktop/CBC/Crystal-Beauty-Clear/public/CBCProducts_extracted/Moisturizers/WhatsApp Image 2025-08-11 at 14.19.34 (2).jpeg',
        stock: '24'
    },
    {
        productID: 'MZ007',
        name: 'Moisturizer 7',
        altNames: 'moisturizers',
        price: '2100',
        labeledPrice: '2450',
        description: 'Deeply hydrating moisturizer.',
        imagePath: 'C:/Users/wickr/Desktop/CBC/Crystal-Beauty-Clear/public/CBCProducts_extracted/Moisturizers/WhatsApp Image 2025-08-11 at 14.19.34.jpeg',
        stock: '24'
    },
    {
        productID: 'MZ008',
        name: 'Moisturizer 8',
        altNames: 'moisturizers',
        price: '2150',
        labeledPrice: '2500',
        description: 'Deeply hydrating moisturizer.',
        imagePath: 'C:/Users/wickr/Desktop/CBC/Crystal-Beauty-Clear/public/CBCProducts_extracted/Moisturizers/WhatsApp Image 2025-08-11 at 14.19.35 (1).jpeg',
        stock: '20'
    },
    {
        productID: 'MZ009',
        name: 'Moisturizer 9',
        altNames: 'moisturizers',
        price: '2200',
        labeledPrice: '2550',
        description: 'Deeply hydrating moisturizer.',
        imagePath: 'C:/Users/wickr/Desktop/CBC/Crystal-Beauty-Clear/public/CBCProducts_extracted/Moisturizers/WhatsApp Image 2025-08-11 at 14.19.35 (2).jpeg',
        stock: '22'
    },
    {
        productID: 'MZ010',
        name: 'Moisturizer 10',
        altNames: 'moisturizers',
        price: '2250',
        labeledPrice: '2600',
        description: 'Deeply hydrating moisturizer.',
        imagePath: 'C:/Users/wickr/Desktop/CBC/Crystal-Beauty-Clear/public/CBCProducts_extracted/Moisturizers/WhatsApp Image 2025-08-11 at 14.19.35.jpeg',
        stock: '25'
    },
    {
        productID: 'SR001',
        name: 'Serum 1',
        altNames: 'serums',
        price: '2500',
        labeledPrice: '2850',
        description: 'Advanced serum for radiant skin.',
        imagePath: 'C:/Users/wickr/Desktop/CBC/Crystal-Beauty-Clear/public/CBCProducts_extracted/Serums/WhatsApp Image 2025-08-11 at 14.12.16.jpeg',
        stock: '23'
    },
    {
        productID: 'SR002',
        name: 'Serum 2',
        altNames: 'serums',
        price: '2550',
        labeledPrice: '2900',
        description: 'Advanced serum for radiant skin.',
        imagePath: 'C:/Users/wickr/Desktop/CBC/Crystal-Beauty-Clear/public/CBCProducts_extracted/Serums/WhatsApp Image 2025-08-11 at 14.12.17 (1).jpeg',
        stock: '21'
    },
    {
        productID: 'SR003',
        name: 'Serum 3',
        altNames: 'serums',
        price: '2600',
        labeledPrice: '2950',
        description: 'Advanced serum for radiant skin.',
        imagePath: 'C:/Users/wickr/Desktop/CBC/Crystal-Beauty-Clear/public/CBCProducts_extracted/Serums/WhatsApp Image 2025-08-11 at 14.12.17.jpeg',
        stock: '23'
    },
    {
        productID: 'SR004',
        name: 'Serum 4',
        altNames: 'serums',
        price: '2650',
        labeledPrice: '3000',
        description: 'Advanced serum for radiant skin.',
        imagePath: 'C:/Users/wickr/Desktop/CBC/Crystal-Beauty-Clear/public/CBCProducts_extracted/Serums/WhatsApp Image 2025-08-11 at 14.12.18 (1).jpeg',
        stock: '20'
    },
    {
        productID: 'SR005',
        name: 'Serum 5',
        altNames: 'serums',
        price: '2700',
        labeledPrice: '3050',
        description: 'Advanced serum for radiant skin.',
        imagePath: 'C:/Users/wickr/Desktop/CBC/Crystal-Beauty-Clear/public/CBCProducts_extracted/Serums/WhatsApp Image 2025-08-11 at 14.12.18 (2).jpeg',
        stock: '25'
    },
    {
        productID: 'SR006',
        name: 'Serum 6',
        altNames: 'serums',
        price: '2750',
        labeledPrice: '3100',
        description: 'Advanced serum for radiant skin.',
        imagePath: 'C:/Users/wickr/Desktop/CBC/Crystal-Beauty-Clear/public/CBCProducts_extracted/Serums/WhatsApp Image 2025-08-11 at 14.12.18.jpeg',
        stock: '23'
    },
    {
        productID: 'SR007',
        name: 'Serum 7',
        altNames: 'serums',
        price: '2800',
        labeledPrice: '3150',
        description: 'Advanced serum for radiant skin.',
        imagePath: 'C:/Users/wickr/Desktop/CBC/Crystal-Beauty-Clear/public/CBCProducts_extracted/Serums/WhatsApp Image 2025-08-11 at 14.12.19 (1).jpeg',
        stock: '24'
    },
    {
        productID: 'SR008',
        name: 'Serum 8',
        altNames: 'serums',
        price: '2850',
        labeledPrice: '3200',
        description: 'Advanced serum for radiant skin.',
        imagePath: 'C:/Users/wickr/Desktop/CBC/Crystal-Beauty-Clear/public/CBCProducts_extracted/Serums/WhatsApp Image 2025-08-11 at 14.12.19.jpeg',
        stock: '24'
    },
    {
        productID: 'SR009',
        name: 'Serum 9',
        altNames: 'serums',
        price: '2900',
        labeledPrice: '3250',
        description: 'Advanced serum for radiant skin.',
        imagePath: 'C:/Users/wickr/Desktop/CBC/Crystal-Beauty-Clear/public/CBCProducts_extracted/Serums/WhatsApp Image 2025-08-11 at 14.12.20 (1).jpeg',
        stock: '22'
    },
    {
        productID: 'SR010',
        name: 'Serum 10',
        altNames: 'serums',
        price: '2950',
        labeledPrice: '3300',
        description: 'Advanced serum for radiant skin.',
        imagePath: 'C:/Users/wickr/Desktop/CBC/Crystal-Beauty-Clear/public/CBCProducts_extracted/Serums/WhatsApp Image 2025-08-11 at 14.12.20 (2).jpeg',
        stock: '25'
    },
    {
        productID: 'SR011',
        name: 'Serum 11',
        altNames: 'serums',
        price: '3000',
        labeledPrice: '3350',
        description: 'Advanced serum for radiant skin.',
        imagePath: 'C:/Users/wickr/Desktop/CBC/Crystal-Beauty-Clear/public/CBCProducts_extracted/Serums/WhatsApp Image 2025-08-11 at 14.12.20.jpeg',
        stock: '24'
    },
    {
        productID: 'SR012',
        name: 'Serum 12',
        altNames: 'serums',
        price: '3050',
        labeledPrice: '3400',
        description: 'Advanced serum for radiant skin.',
        imagePath: 'C:/Users/wickr/Desktop/CBC/Crystal-Beauty-Clear/public/CBCProducts_extracted/Serums/WhatsApp Image 2025-08-11 at 14.12.21 (1).jpeg',
        stock: '21'
    },
    {
        productID: 'SR013',
        name: 'Serum 13',
        altNames: 'serums',
        price: '3100',
        labeledPrice: '3450',
        description: 'Advanced serum for radiant skin.',
        imagePath: 'C:/Users/wickr/Desktop/CBC/Crystal-Beauty-Clear/public/CBCProducts_extracted/Serums/WhatsApp Image 2025-08-11 at 14.12.21.jpeg',
        stock: '22'
    },
    {
        productID: 'SS001',
        name: 'Sunscreen 1',
        altNames: 'sunscreen',
        price: '1800',
        labeledPrice: '2150',
        description: 'Broad spectrum SPF sunscreen.',
        imagePath: 'C:/Users/wickr/Desktop/CBC/Crystal-Beauty-Clear/public/CBCProducts_extracted/sunscreen/WhatsApp Image 2025-08-11 at 14.24.09.jpeg',
        stock: '22'
    },
    {
        productID: 'SS002',
        name: 'Sunscreen 2',
        altNames: 'sunscreen',
        price: '1850',
        labeledPrice: '2200',
        description: 'Broad spectrum SPF sunscreen.',
        imagePath: 'C:/Users/wickr/Desktop/CBC/Crystal-Beauty-Clear/public/CBCProducts_extracted/sunscreen/WhatsApp Image 2025-08-11 at 14.24.10 (1).jpeg',
        stock: '20'
    },
    {
        productID: 'SS003',
        name: 'Sunscreen 3',
        altNames: 'sunscreen',
        price: '1900',
        labeledPrice: '2250',
        description: 'Broad spectrum SPF sunscreen.',
        imagePath: 'C:/Users/wickr/Desktop/CBC/Crystal-Beauty-Clear/public/CBCProducts_extracted/sunscreen/WhatsApp Image 2025-08-11 at 14.24.10.jpeg',
        stock: '22'
    },
    {
        productID: 'SS004',
        name: 'Sunscreen 4',
        altNames: 'sunscreen',
        price: '1950',
        labeledPrice: '2300',
        description: 'Broad spectrum SPF sunscreen.',
        imagePath: 'C:/Users/wickr/Desktop/CBC/Crystal-Beauty-Clear/public/CBCProducts_extracted/sunscreen/WhatsApp Image 2025-08-11 at 14.24.11 (1).jpeg',
        stock: '25'
    },
    {
        productID: 'SS005',
        name: 'Sunscreen 5',
        altNames: 'sunscreen',
        price: '2000',
        labeledPrice: '2350',
        description: 'Broad spectrum SPF sunscreen.',
        imagePath: 'C:/Users/wickr/Desktop/CBC/Crystal-Beauty-Clear/public/CBCProducts_extracted/sunscreen/WhatsApp Image 2025-08-11 at 14.24.11.jpeg',
        stock: '24'
    },
    {
        productID: 'SS006',
        name: 'Sunscreen 6',
        altNames: 'sunscreen',
        price: '2050',
        labeledPrice: '2400',
        description: 'Broad spectrum SPF sunscreen.',
        imagePath: 'C:/Users/wickr/Desktop/CBC/Crystal-Beauty-Clear/public/CBCProducts_extracted/sunscreen/WhatsApp Image 2025-08-11 at 14.24.12 (1).jpeg',
        stock: '24'
    },
    {
        productID: 'SS007',
        name: 'Sunscreen 7',
        altNames: 'sunscreen',
        price: '2100',
        labeledPrice: '2450',
        description: 'Broad spectrum SPF sunscreen.',
        imagePath: 'C:/Users/wickr/Desktop/CBC/Crystal-Beauty-Clear/public/CBCProducts_extracted/sunscreen/WhatsApp Image 2025-08-11 at 14.24.12 (2).jpeg',
        stock: '24'
    },
    {
        productID: 'SS008',
        name: 'Sunscreen 8',
        altNames: 'sunscreen',
        price: '2150',
        labeledPrice: '2500',
        description: 'Broad spectrum SPF sunscreen.',
        imagePath: 'C:/Users/wickr/Desktop/CBC/Crystal-Beauty-Clear/public/CBCProducts_extracted/sunscreen/WhatsApp Image 2025-08-11 at 14.24.12.jpeg',
        stock: '24'
    },
    {
        productID: 'SS009',
        name: 'Sunscreen 9',
        altNames: 'sunscreen',
        price: '2200',
        labeledPrice: '2550',
        description: 'Broad spectrum SPF sunscreen.',
        imagePath: 'C:/Users/wickr/Desktop/CBC/Crystal-Beauty-Clear/public/CBCProducts_extracted/sunscreen/WhatsApp Image 2025-08-11 at 14.24.13 (1).jpeg',
        stock: '25'
    },
    {
        productID: 'SS010',
        name: 'Sunscreen 10',
        altNames: 'sunscreen',
        price: '2250',
        labeledPrice: '2600',
        description: 'Broad spectrum SPF sunscreen.',
        imagePath: 'C:/Users/wickr/Desktop/CBC/Crystal-Beauty-Clear/public/CBCProducts_extracted/sunscreen/WhatsApp Image 2025-08-11 at 14.24.13.jpeg',
        stock: '23'
    },
    {
        productID: 'SS011',
        name: 'Sunscreen 11',
        altNames: 'sunscreen',
        price: '2300',
        labeledPrice: '2650',
        description: 'Broad spectrum SPF sunscreen.',
        imagePath: 'C:/Users/wickr/Desktop/CBC/Crystal-Beauty-Clear/public/CBCProducts_extracted/sunscreen/WhatsApp Image 2025-08-11 at 14.24.14 (1).jpeg',
        stock: '22'
    },
    {
        productID: 'SS012',
        name: 'Sunscreen 12',
        altNames: 'sunscreen',
        price: '2350',
        labeledPrice: '2700',
        description: 'Broad spectrum SPF sunscreen.',
        imagePath: 'C:/Users/wickr/Desktop/CBC/Crystal-Beauty-Clear/public/CBCProducts_extracted/sunscreen/WhatsApp Image 2025-08-11 at 14.24.14.jpeg',
        stock: '20'
    },
    {
        productID: 'TN001',
        name: 'Toner 1',
        altNames: 'toners',
        price: '1200',
        labeledPrice: '1550',
        description: 'Refreshing toner for balanced skin.',
        imagePath: 'C:/Users/wickr/Desktop/CBC/Crystal-Beauty-Clear/public/CBCProducts_extracted/Toners/WhatsApp Image 2025-08-11 at 13.42.09 (1).jpeg',
        stock: '24'
    },
    {
        productID: 'TN002',
        name: 'Toner 2',
        altNames: 'toners',
        price: '1250',
        labeledPrice: '1600',
        description: 'Refreshing toner for balanced skin.',
        imagePath: 'C:/Users/wickr/Desktop/CBC/Crystal-Beauty-Clear/public/CBCProducts_extracted/Toners/WhatsApp Image 2025-08-11 at 13.42.09.jpeg',
        stock: '20'
    },
    {
        productID: 'TN003',
        name: 'Toner 3',
        altNames: 'toners',
        price: '1300',
        labeledPrice: '1650',
        description: 'Refreshing toner for balanced skin.',
        imagePath: 'C:/Users/wickr/Desktop/CBC/Crystal-Beauty-Clear/public/CBCProducts_extracted/Toners/WhatsApp Image 2025-08-11 at 13.42.10.jpeg',
        stock: '24'
    },
];

// TODO: Fill the products array with your real data (can be generated from markdown table)

async function loginAsAdmin(driver) {
    await driver.get('http://localhost:5173/login');
    await driver.wait(until.elementLocated(By.css('input[type="email"]')), 10000);
    await driver.findElement(By.css('input[type="email"]')).sendKeys('kalanapunsaranew@gmail.com');
    await driver.findElement(By.css('input[type="password"]')).sendKeys('kalana');
    await driver.findElement(By.css('button[type="submit"]')).click();
    // Wait for dashboard or products page to load (adjust selector as needed)
    await driver.wait(until.urlContains('/admin'), 10000);
}

async function addProducts() {
    let driver = await new Builder().forBrowser('chrome').build();
    try {
        // Login first
        await loginAsAdmin(driver);
        for (const product of products) {
            await driver.get('http://localhost:5173/admin/addProduct');
            await driver.wait(until.elementLocated(By.css('input[placeholder="Product ID"]')), 10000);
            await driver.findElement(By.css('input[placeholder="Product ID"]')).sendKeys(product.productID);
            await driver.findElement(By.css('input[placeholder="Product Name"]')).sendKeys(product.name);
            await driver.findElement(By.css('input[placeholder="Alternative Names"]')).sendKeys(product.altNames);
            await driver.findElement(By.css('input[placeholder="Price"]')).sendKeys(product.price);
            await driver.findElement(By.css('input[placeholder="Labeled Price"]')).sendKeys(product.labeledPrice);
            await driver.findElement(By.css('textarea[placeholder="Description"]')).sendKeys(product.description);
            const fileInput = await driver.findElement(By.css('input[type="file"]'));
            await fileInput.sendKeys(product.imagePath);
            await driver.findElement(By.css('input[placeholder="Stock"]')).sendKeys(product.stock);
            await driver.findElement(By.xpath("//button[contains(.,'Add Product')]")).click();
            // Wait for navigation or success message (customize as needed)
            await driver.sleep(2000);
        }
    } finally {
        await driver.quit();
    }
}

addProducts();
