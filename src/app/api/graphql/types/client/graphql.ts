/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = T | null | undefined;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: string; output: string; }
};

export type AdhocLocation = Location & {
  __typename?: 'AdhocLocation';
  address: Scalars['String']['output'];
  city: Scalars['String']['output'];
  eventId: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  zipCode: Scalars['String']['output'];
};

export type CreateAdhocLocationInput = {
  address: Scalars['String']['input'];
  city: Scalars['String']['input'];
  name: Scalars['String']['input'];
  zipCode: Scalars['String']['input'];
};

export type CreateEventInput = {
  adhocLocation?: InputMaybe<CreateAdhocLocationInput>;
  contactEmail: Scalars['String']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  endTime?: InputMaybe<Scalars['DateTime']['input']>;
  hyperlink?: InputMaybe<Scalars['String']['input']>;
  imageURL?: InputMaybe<Scalars['String']['input']>;
  price?: InputMaybe<Scalars['Float']['input']>;
  startTime: Scalars['DateTime']['input'];
  tags: Array<Tag>;
  title: Scalars['String']['input'];
  venueId?: InputMaybe<Scalars['Int']['input']>;
};

export type CreateVenueInput = {
  address: Scalars['String']['input'];
  city: Scalars['String']['input'];
  contactEmail: Scalars['String']['input'];
  imageURL?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  zipCode: Scalars['String']['input'];
};

export type Event = {
  __typename?: 'Event';
  contactEmail: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  endTime?: Maybe<Scalars['DateTime']['output']>;
  hyperlink?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  imageURL?: Maybe<Scalars['String']['output']>;
  location: Location;
  price?: Maybe<Scalars['Float']['output']>;
  startTime: Scalars['DateTime']['output'];
  tags: Array<Tag>;
  title: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type Location = {
  address: Scalars['String']['output'];
  city: Scalars['String']['output'];
  name: Scalars['String']['output'];
  zipCode: Scalars['String']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  _?: Maybe<Scalars['Boolean']['output']>;
  createEvent: Event;
  createVenue: Venue;
  deleteEvent?: Maybe<Event>;
  deleteVenue?: Maybe<Venue>;
};


export type MutationCreateEventArgs = {
  input: CreateEventInput;
};


export type MutationCreateVenueArgs = {
  input: CreateVenueInput;
};


export type MutationDeleteEventArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteVenueArgs = {
  id: Scalars['Int']['input'];
};

export type Query = {
  __typename?: 'Query';
  _?: Maybe<Scalars['Boolean']['output']>;
  event?: Maybe<Event>;
  events: Array<Event>;
  venue?: Maybe<Venue>;
  venues: Array<Venue>;
};


export type QueryEventArgs = {
  id: Scalars['ID']['input'];
};


export type QueryVenueArgs = {
  id: Scalars['Int']['input'];
};

export enum Tag {
  Party = 'PARTY',
  Workshop = 'WORKSHOP'
}

export type Venue = Location & {
  __typename?: 'Venue';
  address: Scalars['String']['output'];
  city: Scalars['String']['output'];
  contactEmail: Scalars['String']['output'];
  events: Array<Event>;
  id: Scalars['Int']['output'];
  imageURL?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  zipCode: Scalars['String']['output'];
};

export type EventsQueryVariables = Exact<{ [key: string]: never; }>;


export type EventsQuery = { __typename?: 'Query', events: Array<{ __typename?: 'Event', id: string, title: string, description?: string | null, price?: number | null, startTime: string, endTime?: string | null, contactEmail: string, hyperlink?: string | null, tags: Array<Tag>, location:
      | { __typename?: 'AdhocLocation', name: string, address: string, zipCode: string, city: string }
      | { __typename?: 'Venue', name: string, address: string, zipCode: string, city: string }
     }> };


export const EventsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Events"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"events"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"startTime"}},{"kind":"Field","name":{"kind":"Name","value":"endTime"}},{"kind":"Field","name":{"kind":"Name","value":"contactEmail"}},{"kind":"Field","name":{"kind":"Name","value":"hyperlink"}},{"kind":"Field","name":{"kind":"Name","value":"tags"}},{"kind":"Field","name":{"kind":"Name","value":"location"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"zipCode"}},{"kind":"Field","name":{"kind":"Name","value":"city"}}]}}]}}]}}]} as unknown as DocumentNode<EventsQuery, EventsQueryVariables>;