import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { cert, getApps, initializeApp, App } from 'firebase-admin/app';
import { getAuth, Auth } from 'firebase-admin/auth';
import { getFirestore, Firestore } from 'firebase-admin/firestore';

@Injectable()
export class FirebaseService implements OnModuleInit {
  private app!: App;
  private auth!: Auth;
  private firestore!: Firestore;

  constructor(private readonly configService: ConfigService) {}

  onModuleInit() {
    const projectId = this.configService.get<string>('FIREBASE_PROJECT_ID');
    const clientEmail = this.configService.get<string>(
      'FIREBASE_CLIENT_EMAIL',
    );
    const privateKey = this.configService.get<string>('FIREBASE_PRIVATE_KEY');

    if (!projectId || !clientEmail || !privateKey) {
      throw new Error(
        'Missing Firebase Admin configuration. Check FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, and FIREBASE_PRIVATE_KEY.',
      );
    }

    this.app =
      getApps().length > 0
        ? getApps()[0]
        : initializeApp({
            credential: cert({
              projectId,
              clientEmail,
              privateKey: privateKey.replace(/\\n/g, '\n'),
            }),
          });

    this.auth = getAuth(this.app);
    this.firestore = getFirestore(this.app);
  }

  getAuth(): Auth {
    return this.auth;
  }

  getFirestore(): Firestore {
    return this.firestore;
  }

  getApp(): App {
    return this.app;
  }
}