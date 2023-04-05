import { MessageBox, TaxRecord, User, UserProfile } from '../types';

export interface RootMachineContext {
	user: User;
	userProfile: UserProfile;
	is_restricted: boolean;
	taxRecord: TaxRecord;
	taxRecords: TaxRecord[];
	errorMessage: MessageBox;
	successMessage: MessageBox;
}
