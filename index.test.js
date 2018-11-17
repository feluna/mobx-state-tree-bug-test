import {User, BranchStore, RootStore} from './index'
import {destroy} from 'mobx-state-tree'

const snapshot = {
  id: 1,
  email: "test@test.com",
  branches: [
    {
      id: 1,
      name: "Branch 1"
    },
    {
      id: 2,
      name: "Branch 2"
    }
  ]
}

it('crashes trying to resolve a reference to a destroyed/recreated model', () => {
  let rootStore = RootStore.create()

  rootStore.setUser(snapshot)
  rootStore.setBranchStore({})

  // Branch with id 1 is accessed, and it is attached to the user
  rootStore.branchStore.setActiveBranch(1)
  expect(rootStore.branchStore.activeBranch).toEqual({
    id: 1,
    name: "Branch 1"
  })

  // Destroy both models, and recreate
  rootStore.destroyUser()
  rootStore.destroyBranchStore()
  
  // At this point, the branch with id 2 still lives 
  // Since we did not access it directly, it was not attached to the User
  // Therefore, it was not destroyed
  
  // If we try to recreate the same model, and access the branch with id 2,
  // It cannot resolve the reference, because the same branch exists at 2 diffent place
  rootStore.setUser(snapshot)
  rootStore.setBranchStore({})

  rootStore.branchStore.setActiveBranch(2)
  // Throws
  expect(rootStore.branchStore.activeBranch).toEqual({
    id: 2,
    name: "Branch 2"
  })
})

